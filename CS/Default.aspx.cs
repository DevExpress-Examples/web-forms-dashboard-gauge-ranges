using System;
using System.Linq;
using System.Drawing;
using Newtonsoft.Json;
using System.Collections.Generic;
using DashboardGaugeRanges.Models;
using DevExpress.DashboardCommon;
using DevExpress.DashboardWeb;
using DevExpress.XtraGauges.Core.Drawing;
using DevExpress.XtraReports.UI;

namespace DashboardGaugeRanges {
    public partial class _Default : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            ASPxDashboard1.SetDataSourceStorage(CreateDataSourceStorage());
        }

        public DataSourceInMemoryStorage CreateDataSourceStorage() {
            DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();
            DashboardObjectDataSource objDataSource = new DashboardObjectDataSource("Object Data Source", typeof(SalesPersonData));

            objDataSource.DataMember = "GetSalesData";
            dataSourceStorage.RegisterDataSource("objectDataSource", objDataSource.SaveToXml());

            return dataSourceStorage;
        }

        protected void ASPxDashboard1_CustomExport(object sender, CustomExportWebEventArgs e) {
            const string CustomPropertyName = "GaugeRanges";
            Dictionary<string, XRControl> controls = e.GetPrintableControls();
            
            foreach (var control in controls) {
                string componentName = control.Key;
                XRGaugeDashboardItem gaugeControl = control.Value as XRGaugeDashboardItem;
                GaugeDashboardItem gaugeItem = e.GetDashboardItem(componentName) as GaugeDashboardItem;
               
                if (gaugeControl != null && gaugeItem != null) {
                    gaugeControl.Gauges.ToList().ForEach(gauge => {
                        var xrGauge = gauge.Gauge;
                        var internalGauge = xrGauge.Gauge as DevExpress.XtraGauges.Core.Customization.DashboardGauge;
                        var scale = internalGauge.Elements.OfType<DevExpress.XtraGauges.Core.Model.ArcScale>().FirstOrDefault();

                        // Add a circular scale.
                        if (scale == null) {
                            scale = new DevExpress.XtraGauges.Core.Model.ArcScale();
                            internalGauge.Elements.Add(scale);
                        }

                        var layer = internalGauge.Elements.OfType<DevExpress.XtraGauges.Core.Model.ArcScaleBackgroundLayer>().FirstOrDefault();

                        // Display scales on top.
                        if (layer != null)
                            layer.ZOrder = 1000;

                        var rangesJSON = gaugeItem.CustomProperties[CustomPropertyName];
                        var customRanges = JsonConvert.DeserializeObject<List<CustomRange>>(rangesJSON);
                        
                        customRanges.ForEach(customRange => {
                            var range = new DevExpress.XtraGauges.Core.Model.ArcScaleRange();
                            range.ShapeOffset = -10;
                            range.StartValue = customRange.startValue;
                            range.EndValue = customRange.endValue;
                            range.AppearanceRange.ContentBrush = new SolidBrushObject(ColorTranslator.FromHtml(customRange.color));
                            scale.Ranges.Add(range);
                        });
                    });
                }
            }
        }

    }
}