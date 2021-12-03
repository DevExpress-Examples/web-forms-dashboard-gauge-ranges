var GaugeRangesExtension = (function () {
    var Model = DevExpress.Dashboard.Model;
    var dxButton = DevExpress.ui.dxButton;
    var dxPopup = DevExpress.ui.dxPopup;
    var dxForm = DevExpress.ui.dxForm;
    var dxList = DevExpress.ui.dxList;
    var dxToolbar = DevExpress.ui.dxToolbar;
    var DataSource = DevExpress.data.DataSource;

    // 1. Model
    var GaugeRangesProperty = {
        ownerType: Model.GaugeItem,
        propertyName: 'GaugeRanges',
        defaultValue: "[]",
        valueType: 'string'
    };
    Model.registerCustomProperty(GaugeRangesProperty);

    // 2. Viewer
    function onItemWidgetOptionsPrepared(args) {
        if (args.dashboardItem instanceof Model.GaugeItem) {
            var gaugeRanges = getValue(args.dashboardItem);

            var rangesArray = [];
            gaugeRanges.forEach(function (range) {
                rangesArray.push({
                    startValue: range.startValue,
                    endValue: range.endValue,
                    color: range.color
                });
            });
            args.options.rangeContainer = { ranges: rangesArray };
        }
    };

    // 3. Designer
    function onCustomizeSections(args) {
        var gaugeItem = args.dashboardItem;
        if (gaugeItem instanceof Model.GaugeItem) {
            args.addSection({
                title: "Ranges (custom)",
                items: [
                    {
                        dataField: GaugeRangesProperty.propertyName,
                        template: function (args, element) {
                            var buttonContainer = document.createElement('div');
                            new dxButton(buttonContainer, {
                                text: 'Edit',
                                onClick: function () {
                                    showPopup(gaugeItem);
                                }
                            })
                            return buttonContainer;
                        },
                        label: {
                            visible: false,
                        }
                    }
                ]
            });
        }
    };

    // Generates a pop-up window.
    function showPopup(gaugeItem) {
        var popupContainer = document.createElement('div');
        document.body.appendChild(popupContainer);
        var popupOptions = {
            width: '800px',
            height: 'auto',
            closeOnOutsideClick: false,
            contentTemplate: function (contentContainer) {
                var formContainer = document.createElement('div');
                var formOptions = getFormOptions(gaugeItem);
                this._form = new dxForm(formContainer, formOptions);
                return formContainer;
            },
            onHidden: function () {
                document.body.removeChild(popupContainer)
            },
            title: 'Ranges',
        };
        var popup = new dxPopup(popupContainer, popupOptions);
        popup.show();
    }
    function getValue(gaugeItem) {
        var ret = [];
        try {
            ret = JSON.parse(gaugeItem.customProperties.getValue(GaugeRangesProperty.propertyName));
        } catch (e) {
            ret = [];
        }
        return ret;
    }
    function setValue(gaugeItem, value) {
        return gaugeItem.customProperties.setValue(GaugeRangesProperty.propertyName, JSON.stringify(value));
    }
    // Creates editors in the pop-up window.
    function createListAndToolbar(form, gaugeItem) {
        var element = document.createElement('div');
        var toolbarContainer = document.createElement('div');
        element.appendChild(toolbarContainer);
        var editButton = null;
        var removeButton = null;
        var list = null;

        var toolbarOptions = {
            items: [{
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'add',
                    stylingMode: 'text',
                    onClick: function (e) {
                        var gaugeRanges = getValue(gaugeItem);
                        var key = gaugeRanges.reduce(function (acc, item) { return acc < item.key ? item.key : acc }, 0) + 1;
                        var newGaugeRange = {
                            key: key,
                            name: 'Range' + key,
                            startValue: 0,
                            endValue: 0,
                            color: '#000000'
                        };
                        form.option('formData', newGaugeRange);
                        var itemInDataSource = gaugeRanges.filter(function (item) { return item.key === newGaugeRange.key })[0];
                        if (!itemInDataSource) {
                            gaugeRanges.push(newGaugeRange);
                        } else {
                            var index = gaugeRanges.indexOf(itemInDataSource);
                            gaugeRanges[index] = newGaugeRange;
                        }
                        setValue(gaugeItem, gaugeRanges);
                        list.reload();
                        list.option('selectedItem', gaugeRanges[gaugeRanges.length - 1]);
                    },
                }
            },
            {
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'remove',
                    stylingMode: 'text',
                    onInitialized: function (e) { removeButton = e.component },
                    onClick: function () {
                        var gaugeRanges = getValue(gaugeItem);
                        var selectedKey = list.option('selectedItem').key;
                        var index = gaugeRanges.indexOf(gaugeRanges.filter(function (line) { return line.key === selectedKey })[0]);
                        if (index >= 0) {
                            gaugeRanges.splice(index, 1);
                            setValue(gaugeItem, gaugeRanges);
                            list.reload();
                            list.option('selectedItem', gaugeRanges[gaugeRanges.length - 1]);
                        }
                    },
                }
            }]
        };

        var updateToolbarState = function (hasSelectedItem) {
            editButton && editButton.option('disabled', !hasSelectedItem);
            removeButton && removeButton.option('disabled', !hasSelectedItem);
        }

        var toolbar = new dxToolbar(toolbarContainer, toolbarOptions);

        var listOptions = {
            dataSource: new DataSource({ load: function () { return getValue(gaugeItem) } }),
            displayExpr: 'name',
            height: '200px',
            keyExpr: 'key',
            noDataText: 'Add range',
            selectionMode: 'single',
            onContentReady: function (e) { updateToolbarState(!!e.component.option('selectedItem')) },
            onSelectionChanged: function (e) {
                updateToolbarState(!!e.component.option('selectedItem'));
                form.option('formData', e.component.option('selectedItem'));
            }
        };

        var listContainer = document.createElement('div');
        element.appendChild(listContainer);

        list = new dxList(listContainer, listOptions);

        return element;
    }

    // Gets values for the pop-up window's editors.
    function getFormOptions(gaugeItem) {
        return {
            formData: getValue(gaugeItem)[0] || null,
            colCount: 2,
            items: [
                {
                    itemType: 'group',
                    template: function (args, element) { return createListAndToolbar(args.component, gaugeItem) },
                },
                {
                    itemType: 'group',
                    items: [
                        {
                            dataField: 'name',
                            editorType: 'dxTextBox',
                        },
                        {
                            dataField: 'startValue',
                            editorType: 'dxNumberBox',
                            label: {
                                text: 'Start',
                            },
                            editorOptions: {
                                showSpinButtons: true,
                            }
                        },
                        {
                            dataField: 'endValue',
                            editorType: 'dxNumberBox',
                            label: {
                                text: 'End',
                            },
                            editorOptions: {
                                showSpinButtons: true,
                            }
                        },
                        {
                            dataField: 'color',
                            editorType: 'dxColorBox',
                            label: {
                                text: 'Color',
                            }
                        }
                    ]
                }
            ],
            onFieldDataChanged: function (e) {
                var formData = e.component.option("formData");
                var gaugeRanges = getValue(gaugeItem);
                var editedGaugeRanges = gaugeRanges.filter(function (line) { return line.key === formData.key })[0];
                gaugeRanges[gaugeRanges.indexOf(editedGaugeRanges)] = formData;
                setValue(gaugeItem, gaugeRanges);
            },
        };
    }

    // 4. Event Subscription
    function GaugeRangesExtension(dashboardControl) {
        this.name = "GaugeRanges",
            this.start = function () {
                var viewerApiExtension = dashboardControl.findExtension('viewer-api');
                if (viewerApiExtension) {
                    viewerApiExtension.on('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
                }
                var optionsPanelExtension = dashboardControl.findExtension("item-options-panel");
                if (optionsPanelExtension) {
                    optionsPanelExtension.on('customizeSections', onCustomizeSections);
                }
            },
            this.stop = function () {
                var viewerApiExtension = dashboardControl.findExtension('viewer-api');
                if (viewerApiExtension) {
                    viewerApiExtension.off('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
                }
                var optionsPanelExtension = dashboardControl.findExtension("item-options-panel");
                if (optionsPanelExtension) {
                    optionsPanelExtension.off('customizeSections', onCustomizeSections);
                }
            }
    }
    return GaugeRangesExtension;
}());
