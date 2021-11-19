<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/429719105/21.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1046226)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# Dashboard for Web Forms - How to apply ranges to the Gauges item by using Custom Properties 
<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/429719105/)**
<!-- run online end -->

This example show how to edit and display [Ranges](https://js.devexpress.com/Documentation/Guide/UI_Components/CircularGauge/Visual_Elements/#Range_Container) for the [Gauges](https://docs.devexpress.com/Dashboard/117164/web-dashboard/create-dashboards-on-the-web/dashboard-item-settings/gauges) item. Since this functionality is not available in built-in Gauges settings, it is necessary to use [Custom Properties](https://docs.devexpress.com/Dashboard/401702/web-dashboard/ui-elements-and-customization/create-custom-properties). In addition, it is necessary to apply ranges on the server-side when the dashboard is exported. The [ASPxDashboard.CustomExport](https://docs.devexpress.com/Dashboard/DevExpress.DashboardWeb.ASPxDashboard.CustomExport) event is handled for this purpose.

The resulting dashboard looks as follows:

![](images/screenshot.png)

To display the Ranges editing UI for the Gauges item go to [Dashboard Item Menu](https://docs.devexpress.com/Dashboard/117446/web-dashboard/ui-elements-and-customization/ui-elements/dashboard-item-menu) > Options > Ranges (custom) > Edit.

<!-- default file list -->
## Files to look at

* [Default.aspx](./CS/Default.aspx)
* [Default.aspx.cs](./CS/Default.aspx.cs)
* [CustomRange.cs](./CS/Models/CustomRange.cs)
* [GaugeRangesExtension.js](./CS/GaugeRangesExtension.js)

<!-- default file list end -->

## Documentation

- [Access to Underlying Widgets in ASP.NET Web Forms](https://docs.devexpress.com/Dashboard/117573/web-dashboard/aspnet-web-forms-dashboard-control/access-to-underlying-widgets)
- [Custom Properties](https://docs.devexpress.com/Dashboard/401702/web-dashboard/ui-elements-and-customization/custom-properties)
- [ASPxDashboard.CustomExport](https://docs.devexpress.com/Dashboard/DevExpress.DashboardWeb.ASPxDashboard.CustomExport)

## More Examples

- [Dashboard - Constant Lines](https://github.com/DevExpress-Examples/dashboard-constant-lines)
- [Dashboard for Web Forms - How to access API of underlying widgets](https://github.com/DevExpress-Examples/how-to-access-api-of-underlying-widgets-in-the-aspnet-dashboard-control-t492396)
