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
            "apiCacheManager": [{
                    "id": "olca_apiCacheManager_sectionTitle",
                    "template": "<span ng-show='formState.isProgramNull'>{{formState.isProgramNull}}<h4 class='no-margin'>No Data Cached</h4></span>"
                },
                {
                    "id": "olca_apiCacheManager_programName",
                    "key": "PROGRAM_OBJ",
                    "type": "ep-select",
                    "className": "col-sm-9",
                    "templateOptions": {
                        "label": "Program Name",
                        "valueProp": "Program_Name",
                        "labelProp": "Program_Name",
                        "actualModel": "selectedProgram"
                    },
                    "expressionProperties": {
                        "templateOptions.options": "formState.programCacheData",
                        "hide": "formState.isProgramNull"
                    }
                },
                {
                    "id": "olca_apiCacheManager_programBtn",
                    "className": "col-sm-3",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Delete cache for program",
                        "btn-type": "primary",
                        "onClick": "formState.deleteProgramCache()"
                    },
                    "expressionProperties": {
                        "hide": "formState.isProgramNull || !formState.isProgSelected"
                    }
                },
                {
                    "id": "olca_apiCacheManager_keyName",
                    "key": "KEY_OBJ",
                    "type": "ep-select",
                    "className": "col-sm-9",
                    "templateOptions": {
                        "label": "Key Name",
                        "valueProp": "Key_Name",
                        "labelProp": "Key_Name",
                        "actualModel": "selectedKey"
                    },
                    "expressionProperties": {
                        "templateOptions.options": "formState.cachedProgramKeys",
                        "hide": "formState.isProgramNull || !formState.isProgSelected"
                    }
                },
                {
                    "id": "olca_apiCacheManager_keyBtn",
                    "className": "col-sm-3",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Delete cache for key",
                        "btn-type": "primary",
                        "onClick": "formState.deleteKeyCache()"
                    },
                    "expressionProperties": {
                        "hide": "formState.isProgramNull || formState.hideDelKeyBtn"
                    }
                }
            ]
        }, undefined, 2);

        vm.rightJson = JSON.stringify({
            "apiCacheManager": [{
                    "id": "olca_apiCacheManager_sectionTitle",
                    "template": "<span ng-show='formState.isProgramNull'>{{formState.isProgramNull}}<h4 class='no-margin'>No Data Cached</h4></span>",
                    "templateOptions": {
                        "newKey": "newVal"
                    }
                },
                {
                    "id": "olca_apiCacheManager_programName",
                    "key": "PROGRAM_OBJ",
                    "type": "ep-select",
                    "className": "col-sm-9",
                    "templateOptions": {
                        "label": "Program Name",
                        "valueProp": "Program_Name",
                        "labelProp": "Program_Name",
                        "actualModel": "selectedProgram",
                        "newKey": "newVal"
                    },
                    "expressionProperties": {
                        "templateOptions.options": "formState.programCacheData",
                        "hide": "formState.isProgramNull"
                    }
                },
                {
                    "id": "olca_apiCacheManager_programBtn",
                    "className": "col-sm-3",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Delete cache for program new",
                        "btn-type": "primary",
                        "onClick": "formState.deleteProgramCache()"
                    },
                    "expressionProperties": {
                        "hide": "formState.isProgramNull || !formState.isProgSelected"
                    }
                },
                {
                    "id": "olca_apiCacheManager_keyName",
                    "key": "KEY_OBJ",
                    "type": "ep-select",
                    "className": "col-sm-9",
                    "templateOptions": {
                        "label": "Key Name",
                        "valueProp": "Key_Name",
                        "labelProp": "Key_Name",
                        "actualModel": "selectedKey"
                    },
                    "expressionProperties": {
                        "templateOptions.options": "formState.cachedProgramKeys",
                        "hide": "formState.isProgramNull || !formState.isProgSelected"
                    }
                },
                {
                    "id": "olca_apiCacheManager_keyBtn",
                    "className": "col-sm-3",
                    "type": "ep-button",
                    "templateOptions": {
                        "text": "Delete cache for key",
                        "btn-type": "primary",
                        "onClick": "formState.deleteKeyCache()"
                    },
                    "expressionProperties": {
                        "hide": "formState.isProgramNull || formState.hideDelKeyBtn"
                    }
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

        vm.JsonDummyText = "";
        vm.keysArray = [];
        vm.valsArray = [];
        vm.showAllPaths = function (leftJsonString, rightJsonString) {
            vm.valsArray = [];
            var leftJson = leftJsonString ? JSON.parse(leftJsonString) : {};
            var rightJson = rightJsonString ? JSON.parse(rightJsonString) : {};
            vm.keysArray = parseKeys(leftJson);
        }

        /**
         * Parse each property and find out 
         */
        var parseKeys = function (obj, keyString) {
            var _keyString = keyString || '';
            var keysArray = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    /** check if the value is an object
                     * and if it is, then run the parseKeys
                     * function with value as the array,
                     * and as keyString + "." + key
                     * keyString param
                     */
                    if (obj[key].constructor === {}.constructor) {
                        var array = parseKeys(obj[key], _keyString + "[\"" + key + "\"]");
                        keysArray = keysArray.concat(array);
                    } else {
                        keysArray.push(_keyString + "[\"" + key + "\"]");
                    }
                }
            }
            return keysArray;
        }

        /** stringify an array */
        var stringifyArray = function (arrayObj) {
            var resultString = '[';
            arrayObj.forEach(function (element) {
                resultString = resultString + JSON.stringify(element, undefined, 2) + ',';
            }, this);
            resultString = trimCommas(resultString) + ']';
            return resultString;
        }

        var trimCommas = function (str) {
            return str.replace(/(^,)|(,$)/g, "");
        }

        /**
         * Compare 2 objects
         */
        // vm.compareAndGetDiffJson = function (leftJson, rightJson) {
        //     vm.diffObject = {};
        //     var leftJsonObj = JSON.parse(leftJson);
        //     var righJsonObj = JSON.parse(rightJson);
        //     var leftStringArray = parseKeys(leftJsonObj);
        //     var rightStringArray = parseKeys(righJsonObj);
        //     for (var index = 0; index < rightStringArray.length; index++) {
        //         var rightString = rightStringArray[index];
        //         /** check if the left JSON contains this property */
        //         if (checkPropertyPathUsingEval(leftJsonObj, rightString)) {
        //             /** check if the value is same on the right json */
        //             var valueCheck = valueCompare(eval(cleanStringForCompare('leftJsonObj' + rightString)), eval(cleanStringForCompare('righJsonObj' + rightString)));
        //             var checkBool = eval(cleanStringForCompare('leftJsonObj' + rightString)) === eval(cleanStringForCompare('righJsonObj' + rightString));
        //             if (!valueCheck) {
        //                 vm.assignValTo(rightString, righJsonObj);
        //             }
        //         } else {
        //             vm.assignValTo(rightString, righJsonObj);
        //         }
        //     }
        //     vm.diffObjectString = JSON.stringify(vm.diffObject, undefined, 2);
        // }

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
            vm.testPathSetValue(vm.differences);
        }


        /** Method to test jsonQ */
        vm.testPathSetValue = function (differences) {
            var overrideJSON = jsonQ({});
            differences.forEach(element => {
                overrideJSON.setPathValue(element.path, element.rhs);
            });
            console.log(overrideJSON.jsonQ_root);
        }

        var checkPropertyPathUsingEval = function (obj, objPropPath) {
            var result = false;
            try {
                result = eval('obj' + objPropPath);
            } catch (error) {
                console.log('Path not found in the left object');
            }
            return result;
        }

        var cleanStringForCompare = function (dirtyString) {
            return dirtyString.replace(/'/g, '"');
        }

        var valueCompare = function (leftValue, rightValue) {
            /** Check the type */
            if (leftValue.constructor === rightValue.constructor) {
                /** in case the objects are of the same type */
                /** check if they are array */
                if (leftValue.constructor === [].constructor) {
                    /** compare arrays */
                    return compareArrays(leftValue, rightValue);
                    /** check if they are objects */
                } else if (leftValue.constructor === {}.constructor) {
                    /** compare objects */
                    return compareObjects(leftValue, rightValue);
                } else {
                    return leftValue === rightValue;
                }
            } else {
                /** in case the objects are not of the same type */
                return false;
            }
        }

        var compareObjects = function (leftObject, rightObject) {
            /** if object compare each property  */
            return JSON.stringify(leftObject) === JSON.stringify(rightObject);
        }

        var compareArrays = function (leftArray, rightArray) {
            /** if object compare each item  */
            if (leftArray.length === rightArray.length) {
                for (var index = 0; index < leftArray.length; index++) {
                    var element = leftArray[index];
                    if (!valueCompare(leftArray[index], rightArray[index])) {
                        return false;
                    }
                }
            } else {
                return false;
            }
            return true;
        }

        vm.assignValTo = function (propString, rightJson, diffObjVariableName) {
            var _diffObjVariableName = diffObjVariableName || 'vm.diffObject';
            if (vm.checkAndCreatePropertyIfNeeded(propString))
                eval(_diffObjVariableName + propString + '= rightJson' + propString);
            //console.log(vm.diffObject);
        }

        vm.getPropConcatArray = function (propString) {
            propString = propString.replace(/\["/g, '|').replace(/"\]/g, '');
            propString = propString.substring(1);
            var propArray = propString.split('|');
            var propConcatArray = [];
            for (var index = 1; index <= propArray.length; index++) {
                var stringVal = '';
                for (var j = 0; j < index; j++) {
                    stringVal = stringVal + '["' + propArray[j] + '"]';
                }
                propConcatArray.push(stringVal);
            }
            return propConcatArray;
        }

        vm.checkAndCreatePropertyIfNeeded = function (propString) {
            var result = false;
            var propConcatArray = vm.getPropConcatArray(propString);
            /** now that you have the array of concated string paths
             * in an ascending order check each path and make sure that the object is
             * having all the paths
             */
            propConcatArray.forEach(function (element) {
                if (!eval('vm.diffObject' + element)) {
                    eval('vm.diffObject' + element + '= {};');
                }
            });
            if (eval('vm.diffObject' + propString)) {
                result = true;
            }
            return result;
        }
    }
})();