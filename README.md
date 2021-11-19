# Dashboard for Web Forms - How to apply ranges to the Gauges item by using Custom Properties 

This example show how to edit and display [Ranges](https://js.devexpress.com/Documentation/Guide/UI_Components/CircularGauge/Visual_Elements/#Range_Container) for the [Gauges](https://docs.devexpress.com/Dashboard/117164/web-dashboard/create-dashboards-on-the-web/dashboard-item-settings/gauges) item. Since this functionality is not available in built-in Gauges settings, it is necessary to use [Custom Properties](https://docs.devexpress.com/Dashboard/401702/web-dashboard/ui-elements-and-customization/create-custom-properties). In addition, it is necessary to apply ranges on the server-side when the dashboard is exported. The [ASPxDashboard.CustomExport](https://docs.devexpress.com/Dashboard/DevExpress.DashboardWeb.ASPxDashboard.CustomExport) event is handled for this purpose.

The resulting dashboard looks as follows:

![](images/screenshot.png)

To display the Ranges editing UI for the Gauges item go to [Dashboard Item Menu](https://docs.devexpress.com/Dashboard/117446/web-dashboard/ui-elements-and-customization/ui-elements/dashboard-item-menu) > Options > Ranges (custom) > Edit

<!-- default file list -->
## Files to look at

* [Default.aspx](./CS/Default.aspx)
* [Default.aspx.cs](./CS/Default.cs)
* [CustomRange.cs](./CS/Models/CustomRange.cs)
* [GaugeRangesExtension.js](./CS/GaugeRangesExtension.js)

<!-- default file list end -->

## Documentation

- [Access to Underlying Widgets in ASP.NET Web Forms](https://docs.devexpress.com/Dashboard/117573/web-dashboard/aspnet-web-forms-dashboard-control/access-to-underlying-widgets)
- [Custom Properties](https://docs.devexpress.com/Dashboard/401702/web-dashboard/ui-elements-and-customization/custom-properties)
- [ASPxDashboard.CustomExport](https://docs.devexpress.com/Dashboard/DevExpress.DashboardWeb.ASPxDashboard.CustomExport)

## More Examples

- [Dashboard - Constant Lines](https://github.com/DevExpress-Examples/dashboard-constant-lines)
- [Dashboard for Web Forms - How to access API of underlying widgets](https://supportcenter.devexpress.com/ticket/details/t492396/asp-net-web-forms-dashboard-how-to-access-api-of-underlying-widgets)
