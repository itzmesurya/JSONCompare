(function () {
    'use strict';

    angular
        .module('jsoncompare')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$parse', '$window'];

    function HomeController($scope, $parse, $window) {
        var vm = this;
        var _ = window._;
        vm.leftJson = JSON.stringify({
            "title": [{
                "id": "clutch_dealerCoupons_title_Html",
                "template": "<div class='col-md-12'><h3>Communications / Model Triggers</h3><hr class='marginTop10 marginBot10'/></div>"
            }],
            "MainForm": [{
                    "id": "clutch_dealerCoupons_mainform_html1",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_mainform_communicationType",
                    "key": "COMMUNICATION_TYPE",
                    "type": "ep-radio",
                    "className": "col-sm-12",
                    "templateOptions": {
                        "options": [{
                                "name": "Touchpoints",
                                "value": "0"
                            },
                            {
                                "name": "Model Triggers",
                                "value": "4"
                            },
                            {
                                "name": "Internet Offers",
                                "value": "5"
                            },
                            {
                                "name": "Targeted Online Advertising",
                                "value": "6"
                            }
                        ],
                        "required": true,
                        "title": "this is true"
                    },
                    "validation": {
                        "messages": {
                            "required": "Select an option."
                        }
                    },
                    "expressionProperties": {
                        "onBlur": "formState.communicationTypeChange(model.COMMUNICATION_TYPE, {CAMPAIGN_FLAG:model.COMMUNICATION_TYPE}, 'vm.formModel.COMMUNICATION_OBJID = undefined')",
                        "templateOptions.foo": "model.COMMUNICATION_TYPE ? model.COMMUNICATION_TYPE : model.COMMUNICATION_TYPE=\"0\""
                    }
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html2",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-xs-12 col-sm-12 ",
                    "$$hashKey": "clutch_dealerCoupons_mainform_fieldGroup1",
                    "fieldGroup": [{
                            "id": "clutch_dealerCoupons_mainform_fieldGroup1_touchpointsddl",
                            "key": "COMMUNICATION_OBJ",
                            "type": "ep-searchableDropdown",
                            "className": "col-md-8 col-lg-8",
                            "templateOptions": {
                                "actualModel": "COMMUNICATION_OBJID",
                                "label": "Touchpoints",
                                "title": "Touchpoints",
                                "searchableinitKey": "Communications",
                                "valueProp": "OBJID",
                                "labelProp": "NAME",
                                "isSelectOptionRequired": true,
                                "required": true,
                                "requiresInitParams": "true",
                                "updateModel": "model.TOUCHPOINT_LONG_DESCRIPTION = model.COMMUNICATION_OBJ.LONG_DESCRIPTION"
                            },
                            "validation": {
                                "messages": {
                                    "required": "\"Touchpoint is required\""
                                }
                            },
                            "expressionProperties": {
                                "templateOptions.filterText": "{\"CAMPAIGN_FLAG\":model.COMMUNICATION_TYPE?model.COMMUNICATION_TYPE:\"0\"}",
                                "templateOptions.initParams": "{\"pi_input_xml\":{\"LOOKUP_COLUMN_NAME\":\"PROGRAM_NAME\",\"LOOKUP_COLUMN_VALUE\":formState.programName}}",
                                "templateOptions.label": "formState.communicationTypeName",
                                "onblur": "formState.touchpontddlChange(model.COMMUNICATION_OBJ, 'COMMUNICATION_OBJ')",
                                "templateOptions.disabled": "!model.COMMUNICATION_TYPE"
                            }
                        },
                        {
                            "className": " float-right",
                            "id": "clutch_dealerCoupons_mainform_fieldGroup1_addnewButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "onClick": "formState.addCoupon()",
                                "text": "<div><i class=\"ace-icon fa fa-plus-square bigger-110\"></i>&nbsp;Add Coupon</div>",
                                "type": "submit",
                                "btnType": "primary ",
                                "title": "This button allows you to Add information"
                            },
                            "hideExpression": "!model.COMMUNICATION_OBJID"
                        },
                        {
                            "key": "TOUCHPOINT_LONG_DESCRIPTION",
                            "type": "ep-label",
                            "id": "clutch_dealerCoupons_modelform_touchpointDescription",
                            "className": "col-md-8 col-lg-8  no-horizontal-padding",
                            "templateOptions": {
                                "title": "Description",
                                "label": "Description:"
                            },
                            "hideExpression": "!model.COMMUNICATION_OBJID"
                        }
                    ]
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html3",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "key": "formData",
                    "id": "clutch_dealerCoupons_mainform_grid",
                    "type": "ep-genericcrud",
                    "className": "col-md-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "",
                        "enableFiltering": true,
                        "enableSorting": true,
                        "enableColumnResizing": true,
                        "paginationPageSizes": [
                            15,
                            25,
                            50
                        ],
                        "paginationPageSize": 15,
                        "enableRowSelection": true,
                        "enableSelectAll": true,
                        "enablePaginationControls": true,
                        "columnDefs": [{
                                "field": "Action",
                                "displayName": "Action",
                                "enableFiltering": false,
                                "enableSorting": false,
                                "enableHiding": false,
                                "width": "80",
                                "cellTemplate": "<div class=\"col-xs-12 no-horizontal-padding text-center\"><button type=\"button\"class=\"btn btn-xs btn-primary\" id=\"{{ row.entity.OBJID }}\"ng-click=\"grid.appScope.formState.upsert(row.entity, 'UPDATE', grid.appScope)\"  title=\"This button allows you to Edit information\"><span class=\"glyphicon glyphicon-pencil\"></span><span ng-bind-html=\"grid.appScope.to.editActionDisplay\"></span></button>&nbsp;<button type=\"button\"class=\"btn btn-danger btn-xs\" id=\"{{ row.entity.OBJID }}\"ng-click=\"grid.appScope.formState.deleteData(row.entity, 'DELETE', grid.appScope)\" title=\"This button allows you to Delete information\" ><span class=\"glyphicon glyphicon-trash\"></span><span ng-bind-html=\"grid.appScope.to.editActionDisplay\"></span></button></div>",
                                "cellClass": "no-horizontal-padding"
                            },
                            {
                                "field": "COMMUNICATION_NAME",
                                "displayName": "Category",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "200"
                            },
                            {
                                "field": "COUPON_TITLE",
                                "displayName": "Coupon Title",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "200"
                            },
                            {
                                "field": "COUPON_SUBTITLE",
                                "displayName": "Coupon Subtitle",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "170"
                            },
                            {
                                "field": "PRICE",
                                "displayName": "Price",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "100"
                            }
                        ],
                        "primaryid": "OBJID",
                        "editActionDisplay": "",
                        "deleteActionDisplay": "",
                        "editFormHeader": "Coupon",
                        "modalSize": "md"
                    }
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html4",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-md-12 col-sm-12 text-right",
                    "id": "clutch_dealerCoupons_mainform_submit",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Continue",
                        "onClick": "formState.continue()",
                        "type": "submit",
                        "btnType": "primary ",
                        "title": "This button allows you to Continue to next form"
                    }
                }
            ],
            "ModelForm": [{
                    "key": "COMMUNICATION_NAME",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_touchpointlabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Touchpoint",
                        "label": "Touchpoint"
                    },
                    "expressionProperties": {
                        "templateOptions.label": "formState.communicationTypeName"
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html1",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "key": "BRAND",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_brandlabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Brand",
                        "label": "Brand"
                    },
                    "hideExpression": "model.CAMPAIGN_FLAG == 5"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html2",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>",
                    "hideExpression": "model.CAMPAIGN_FLAG == 0"
                },
                {
                    "key": "ATTRIB_VALUE",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_namelabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Status",
                        "label": "Status"
                    },
                    "hideExpression": "model.CAMPAIGN_FLAG != 4"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html4",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_positionlabel",
                    "key": "POSITION",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "title": "Position",
                        "label": "Position",
                        "required": true,
                        "maxLength": 1,
                        "validator": "integer"
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Position is required\"",
                            "pattern": "\"Invalid Position\""
                        }
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 4 || formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html5",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_coupontitle",
                    "key": "COUPON_TITLE",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Coupon Title",
                        "required": true
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6",
                    "validation": {
                        "messages": {
                            "required": "\"Coupon Title is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html6",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_couponsubtitle",
                    "key": "COUPON_SUBTITLE",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Coupon Subtitle",
                        "required": true
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Coupon Subtitle is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html14",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_coupon_text",
                    "key": "COUPON_TEXT",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Coupon Text",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html7",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_price",
                    "key": "PRICE",
                    "type": "ep-text",
                    "className": "col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Price",
                        "maxLength": 50,
                        "required": false
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Price is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html13",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_price2",
                    "key": "PRICE2",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Price 2",
                        "maxLength": 50
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html8",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_expFactor",
                    "key": "EXP_FACTOR_OBJ",
                    "type": "ep-searchableDropdown",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "actualModel": "EXP_FACTOR",
                        "label": "Expiration date(days)",
                        "title": "Coupon Title",
                        "valueProp": "TITLE",
                        "labelProp": "TITLE",
                        "options": [{
                                "TITLE": "30"
                            },
                            {
                                "TITLE": "60"
                            },
                            {
                                "TITLE": "90"
                            },
                            {
                                "TITLE": "120"
                            },
                            {
                                "TITLE": "None"
                            }
                        ]
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html9",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer1",
                    "key": "DISCLAIMER_1",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 1",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html10",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer2",
                    "key": "DISCLAIMER_2",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 2",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html11",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer3",
                    "key": "DISCLAIMER_3",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 3",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html12",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-xs-12 col-sm-12",
                    "$$hashKey": "clutch_dealerCoupons_modelform_fieldGroup1",
                    "fieldGroup": [{
                            "className": "pull-right  no-horizontal-padding ",
                            "id": "clutch_dealerCoupons_modelform_fieldGroup1_closeButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "text": "<i class=\"ace-icon fa fa-close bigger-110\"></i>&nbsp;Close",
                                "onClick": "formState.close(model,this.form)",
                                "type": "submit",
                                "btnType": "btn  btn-primary",
                                "title": "This button allows you to Close information"
                            }
                        },
                        {
                            "className": "pull-right no-horizontal-padding ",
                            "id": "clutch_dealerCoupons_modelform_fieldGroup1_saveButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "text": "<i class=\"ace-icon fa fa-save\"></i>&nbsp;Save/Done",
                                "onClick": "formState.upsertData(model,this.form,true)",
                                "type": "submit",
                                "btnType": "primary ",
                                "title": "This button allows you to Save information"
                            }
                        }
                    ]
                }
            ]
        }, undefined, 2);

        vm.rightJson = JSON.stringify({
            "title": [{
                "id": "clutch_dealerCoupons_title_Html",
                "template": "<div class='col-md-12'><h3>Communications / Model Triggers</h3><hr class='marginTop10 marginBot10'/></div>"
            }],
            "MainForm": [{
                    "id": "clutch_dealerCoupons_mainform_html1",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_mainform_communicationType",
                    "key": "COMMUNICATION_TYPE",
                    "type": "ep-radio",
                    "className": "col-sm-12",
                    "templateOptions": {
                        "options": [{
                                "name": "Touchpoints",
                                "value": "0"
                            },
                            {
                                "name": "Model Triggers",
                                "value": "4"
                            },
                            {
                                "name": "Internet Offers",
                                "value": "5"
                            },
                            {
                                "name": "Targeted Online Advertising",
                                "value": "6"
                            }
                        ],
                        "required": true,
                        "title": "this is true"
                    },
                    "validation": {
                        "messages": {
                            "required": "Select an option."
                        }
                    },
                    "expressionProperties": {
                        "onBlur": "formState.communicationTypeChange(model.COMMUNICATION_TYPE, {CAMPAIGN_FLAG:model.COMMUNICATION_TYPE}, 'vm.formModel.COMMUNICATION_OBJID = undefined')",
                        "templateOptions.foo": "model.COMMUNICATION_TYPE ? model.COMMUNICATION_TYPE : model.COMMUNICATION_TYPE=\"0\""
                    }
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html2",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-xs-12 col-sm-12 ",
                    "$$hashKey": "clutch_dealerCoupons_mainform_fieldGroup1",
                    "fieldGroup": [{
                            "id": "clutch_dealerCoupons_mainform_fieldGroup1_touchpointsddl",
                            "key": "COMMUNICATION_OBJ",
                            "type": "ep-searchableDropdown",
                            "className": "col-md-8 col-lg-8",
                            "templateOptions": {
                                "actualModel": "COMMUNICATION_OBJID",
                                "label": "Touchpoints",
                                "title": "Touchpoints",
                                "searchableinitKey": "Communications",
                                "valueProp": "OBJID",
                                "labelProp": "NAME",
                                "isSelectOptionRequired": true,
                                "required": true,
                                "requiresInitParams": "true",
                                "updateModel": "model.TOUCHPOINT_LONG_DESCRIPTION = model.COMMUNICATION_OBJ.LONG_DESCRIPTION"
                            },
                            "validation": {
                                "messages": {
                                    "required": "\"Touchpoint is required\""
                                }
                            },
                            "expressionProperties": {
                                "templateOptions.filterText": "{\"CAMPAIGN_FLAG\":model.COMMUNICATION_TYPE?model.COMMUNICATION_TYPE:\"0\"}",
                                "templateOptions.initParams": "{\"pi_input_xml\":{\"LOOKUP_COLUMN_NAME\":\"PROGRAM_NAME\",\"LOOKUP_COLUMN_VALUE\":formState.programName}}",
                                "templateOptions.label": "formState.communicationTypeName",
                                "onblur": "formState.touchpontddlChange(model.COMMUNICATION_OBJ, 'COMMUNICATION_OBJ')",
                                "templateOptions.disabled": "!model.COMMUNICATION_TYPE"
                            }
                        },
                        {
                            "className": " float-right",
                            "id": "clutch_dealerCoupons_mainform_fieldGroup1_addnewButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "onClick": "formState.addCoupon()",
                                "text": "<div><i class=\"ace-icon fa fa-plus-square bigger-110\"></i>&nbsp;Add Coupon</div>",
                                "type": "submit",
                                "btnType": "primary ",
                                "title": "This button allows you to Add information"
                            },
                            "hideExpression": "!model.COMMUNICATION_OBJID"
                        },
                        {
                            "key": "TOUCHPOINT_LONG_DESCRIPTION",
                            "type": "ep-label",
                            "id": "clutch_dealerCoupons_modelform_touchpointDescription",
                            "className": "col-md-8 col-lg-8  no-horizontal-padding",
                            "templateOptions": {
                                "title": "Description",
                                "label": "Description:"
                            },
                            "hideExpression": "!model.COMMUNICATION_OBJID"
                        }
                    ]
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html3",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "key": "formData",
                    "id": "clutch_dealerCoupons_mainform_grid",
                    "type": "ep-genericcrud",
                    "className": "col-md-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "",
                        "enableFiltering": true,
                        "enableSorting": true,
                        "enableColumnResizing": true,
                        "paginationPageSizes": [
                            15,
                            25,
                            50
                        ],
                        "paginationPageSize": 15,
                        "enableRowSelection": true,
                        "enableSelectAll": true,
                        "enablePaginationControls": true,
                        "columnDefs": [{
                                "field": "Action",
                                "displayName": "Action",
                                "enableFiltering": false,
                                "enableSorting": false,
                                "enableHiding": false,
                                "width": "80",
                                "cellTemplate": "<div class=\"col-xs-12 no-horizontal-padding text-center\"><button type=\"button\"class=\"btn btn-xs btn-primary\" id=\"{{ row.entity.OBJID }}\"ng-click=\"grid.appScope.formState.upsert(row.entity, 'UPDATE', grid.appScope)\"  title=\"This button allows you to Edit information\"><span class=\"glyphicon glyphicon-pencil\"></span><span ng-bind-html=\"grid.appScope.to.editActionDisplay\"></span></button>&nbsp;<button type=\"button\"class=\"btn btn-danger btn-xs\" id=\"{{ row.entity.OBJID }}\"ng-click=\"grid.appScope.formState.deleteData(row.entity, 'DELETE', grid.appScope)\" title=\"This button allows you to Delete information\" ><span class=\"glyphicon glyphicon-trash\"></span><span ng-bind-html=\"grid.appScope.to.editActionDisplay\"></span></button></div>",
                                "cellClass": "no-horizontal-padding"
                            },
                            {
                                "field": "COMMUNICATION_NAME",
                                "displayName": "Category",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "200"
                            },
                            {
                                "field": "COUPON_TITLE",
                                "displayName": "Coupon Title",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "200"
                            },
                            {
                                "field": "COUPON_SUBTITLE",
                                "displayName": "Coupon Subtitle",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "170"
                            },
                            {
                                "field": "PRICE",
                                "displayName": "Price",
                                "enableFiltering": true,
                                "enableSorting": true,
                                "enableHiding": false,
                                "width": "100"
                            }
                        ],
                        "primaryid": "OBJID",
                        "editActionDisplay": "",
                        "deleteActionDisplay": "",
                        "editFormHeader": "Coupon",
                        "modalSize": "md"
                    }
                },
                {
                    "id": "clutch_dealerCoupons_mainform_html4",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-md-12 col-sm-12 text-right",
                    "id": "clutch_dealerCoupons_mainform_submit",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Continue",
                        "onClick": "formState.continue()",
                        "type": "submit",
                        "btnType": "primary ",
                        "title": "This button allows you to Continue to next form"
                    }
                }
            ],
            "ModelForm": [{
                    "key": "COMMUNICATION_NAME",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_touchpointlabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Touchpoint",
                        "label": "Touchpoint"
                    },
                    "expressionProperties": {
                        "templateOptions.label": "formState.communicationTypeName"
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html1",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "key": "BRAND",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_brandlabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Brand",
                        "label": "Brand"
                    },
                    "hideExpression": "model.CAMPAIGN_FLAG == 5"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html2",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>",
                    "hideExpression": "model.CAMPAIGN_FLAG == 0"
                },
                {
                    "key": "ATTRIB_VALUE",
                    "type": "ep-label",
                    "id": "clutch_dealerCoupons_modelform_namelabel",
                    "className": "col-md-12 col-lg-12  no-horizontal-padding fBold",
                    "templateOptions": {
                        "title": "Status",
                        "label": "Status"
                    },
                    "hideExpression": "model.CAMPAIGN_FLAG != 4"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html4",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_positionlabel",
                    "key": "POSITION",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "title": "Position",
                        "label": "Position",
                        "required": true,
                        "maxLength": 1,
                        "validator": "integer"
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Position is required\"",
                            "pattern": "\"Invalid Position\""
                        }
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 4 || formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html5",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_coupontitle",
                    "key": "COUPON_TITLE",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Coupon Title",
                        "required": true
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6",
                    "validation": {
                        "messages": {
                            "required": "\"Coupon Title is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html6",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_couponsubtitle",
                    "key": "COUPON_SUBTITLE",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Coupon Subtitle",
                        "required": true
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Coupon Subtitle is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html14",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_coupon_text",
                    "key": "COUPON_TEXT",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Coupon Text",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html7",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_price",
                    "key": "PRICE",
                    "type": "ep-text",
                    "className": "col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Price",
                        "maxLength": 50,
                        "required": false
                    },
                    "validation": {
                        "messages": {
                            "required": "\"Price is required\""
                        }
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html13",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_price2",
                    "key": "PRICE2",
                    "type": "ep-text",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding ",
                    "templateOptions": {
                        "label": "Price 2",
                        "maxLength": 50
                    }
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html8",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_expFactor",
                    "key": "EXP_FACTOR_OBJ",
                    "type": "ep-searchableDropdown",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "actualModel": "EXP_FACTOR",
                        "label": "Expiration date(days)",
                        "title": "Coupon Title",
                        "valueProp": "TITLE",
                        "labelProp": "TITLE",
                        "options": [{
                                "TITLE": "30"
                            },
                            {
                                "TITLE": "60"
                            },
                            {
                                "TITLE": "90"
                            },
                            {
                                "TITLE": "120"
                            },
                            {
                                "TITLE": "None"
                            }
                        ]
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html9",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer1",
                    "key": "DISCLAIMER_1",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 1",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html10",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer2",
                    "key": "DISCLAIMER_2",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 2",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html11",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_disclaimer3",
                    "key": "DISCLAIMER_3",
                    "type": "ep-textarea",
                    "className": "col-sm-12 col-md-12 col-lg-12 no-horizontal-padding",
                    "templateOptions": {
                        "label": "Disclaimer 3",
                        "autosize": false
                    },
                    "hideExpression": "formState.ddlfilter.CAMPAIGN_FLAG == 5 || formState.ddlfilter.CAMPAIGN_FLAG == 6"
                },
                {
                    "id": "clutch_dealerCoupons_modelform_html12",
                    "template": "<div class=\"col-md-12 col-sm-12 space-4\"></div>"
                },
                {
                    "className": "col-xs-12 col-sm-12",
                    "$$hashKey": "clutch_dealerCoupons_modelform_fieldGroup1",
                    "fieldGroup": [{
                            "className": "pull-right  no-horizontal-padding ",
                            "id": "clutch_dealerCoupons_modelform_fieldGroup1_closeButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "text": "<i class=\"ace-icon fa fa-close bigger-110\"></i>&nbsp;Close",
                                "onClick": "formState.close(model,this.form)",
                                "type": "submit",
                                "btnType": "btn  btn-primary",
                                "title": "This button allows you to Close information"
                            }
                        },
                        {
                            "className": "pull-right no-horizontal-padding ",
                            "id": "clutch_dealerCoupons_modelform_fieldGroup1_saveButton",
                            "type": "ep-button",
                            "templateOptions": {
                                "text": "<i class=\"ace-icon fa fa-save\"></i>&nbsp;Save/Done",
                                "onClick": "formState.upsertData(model,this.form,true)",
                                "type": "submit",
                                "btnType": "primary ",
                                "title": "This button allows you to Save information"
                            }
                        }
                    ]
                }
            ]
        }, undefined, 2);

        vm.diffObject = {};

        vm.textAreaChange = function (event, leftOrRight) {
            var parsedObj = null;
            switch (leftOrRight) {
                case 'left':
                    parsedObj = JSON.parse(vm.leftJson);
                    if (parsedObj.constructor === [].constructor) {
                        vm.leftJson = stringifyArray(parsedObj);
                    } else {
                        vm.leftJson = JSON.stringify(JSON.parse(vm.leftJson), undefined, 2);
                    }
                    break;
                case 'right':
                    parsedObj = JSON.parse(vm.rightJson);
                    if (parsedObj.constructor === [].constructor) {
                        vm.rightJson = stringifyArray(parsedObj);
                    } else {
                        vm.rightJson = JSON.stringify(JSON.parse(vm.rightJson), undefined, 2);
                    }
                    break;
                    vm.rightJson = JSON.stringify(JSON.parse(vm.rightJson), undefined, 2);
                    break;
                default:
                    break;
            }

        }
        vm.differences = [];
        vm.compareAndGetDiffJson = function (leftJson, rightJson) {
            vm.diffObject = {};
            var leftJsonObj = JSON.parse(leftJson);
            var righJsonObj = JSON.parse(rightJson);
            var deep = DeepDiff.noConflict();
            // vm.diffObjectString = JSON.stringify(vm.diffObject, undefined, 2);
            // deep.observableDiff(leftJsonObj, righJsonObj, function (d) {
            //     vm.differences.push(d);
            // });
            vm.differences = deep.diff(leftJsonObj, righJsonObj);
            vm.diffObjectString = vm.testPathSetValue(vm.differences, righJsonObj);
        }
        /** Method to test jsonQ */
        vm.testPathSetValue = function (differences, mergedJson) {
            var overrideJSON = jsonQ({});
            /** find all the id's in the merged JSOn and assign it to a new override JSON */
            var mergedJsonQobj = jsonQ(mergedJson);
            var idDetailsArray = mergedJsonQobj.find('id');
            idDetailsArray.jsonQ_current.forEach(element => {
                overrideJSON.setPathValue(element.path, mergedJsonQobj.pathValue(element.path));
            });

            if (differences && differences.length > 0) {
                differences.forEach(element => {
                    overrideJSON.setPathValue(element.path, element.rhs);
                });
            }
            var resultObj = {};
            for (var key in overrideJSON.jsonQ_root) {
                if (overrideJSON.jsonQ_root.hasOwnProperty(key)) {
                    resultObj[key] = $.map(overrideJSON.jsonQ_root[key], function (el) {
                        return el
                    });
                }
            }
            var arrayedParentsFromResultObj = jsonQ(resultObj).find('0').parent();
            console.log(arrayedParentsFromResultObj);
            var keysForArrayConversion = [];
            arrayedParentsFromResultObj.jsonQ_current.forEach(element => {
                keysForArrayConversion.push(_.last(element.path));
            });
            // extract unique items
            keysForArrayConversion = _.uniq(keysForArrayConversion);
            /** loop through the keys for conversion and convert them to array */
            console.log(keysForArrayConversion);
            var objectsForArrayConversion = [];
            keysForArrayConversion.forEach(element => {
                var tempPathArray = jsonQ(resultObj).find(element).jsonQ_current;
                var tempValueArray = jsonQ(resultObj).find(element).value();
                for (var index = 0; index < tempPathArray.length; index++) {
                    var pathObj = tempPathArray[index];
                    var arrayObj = _.toArray(tempValueArray[index])
                    jsonQ(resultObj).setPathValue(pathObj.path, arrayObj);
                }
            });

            return resultObj;
        }
    }
})();