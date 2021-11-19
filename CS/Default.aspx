<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="DashboardGaugeRanges._Default" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title></title>

    <style type="text/css">
        html, body, form {  
            height: 100%;  
            margin: 0;  
            padding: 0;  
            overflow: hidden;  
        }
    </style>
    <script type="text/javascript">
        //<![CDATA[
        function onBeforeRender(s, e) {
            var dashboardControl = s.GetDashboardControl();

            dashboardControl.registerExtension(new GaugeRangesExtension(dashboardControl));
        }
        //]]>
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <dx:ASPxDashboard ID="ASPxDashboard1" runat="server" DashboardStorageFolder="~/App_Data/Dashboards" Height="100%"
            OnCustomExport="ASPxDashboard1_CustomExport">
            <ClientSideEvents BeforeRender="onBeforeRender" />
        </dx:ASPxDashboard>
    </form>
    <script src="GaugeRangesExtension.js"></script>
</body>
</html>