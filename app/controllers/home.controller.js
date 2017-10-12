(function () {
    'use strict';

    angular
        .module('jsoncompare')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$parse'];

    function HomeController($scope, $parse) {
        var vm = this;
        vm.leftJson = JSON.stringify({
            "key1": "val1",
            "key2": "val2",
            "key3": {
                "key4": "val4",
                "key5": "val5",
                "key6": {
                    "key7": "val7",
                    "key8": {
                        "key9": "val9",
                        "key10": "val10",
                        "key11": ["val11a", "val11b", {
                            "foo": "bar"
                        }],
                        "key12": 34,
                        "key13": {
                            "key14": true
                        }
                    }
                }
            }
        }, undefined, 2);

        vm.rightJson = JSON.stringify({
            "key1": "val1",
            "key2": "val2a",
            "key3": {
                "key4": "val4",
                "key5": "val5",
                "key6": {
                    "key7": "val7",
                    "key8": {
                        "key9": "val9",
                        "key10": "val10a",
                        "key11": ["val11ab", "val11bb", {
                            "foo": "bar"
                        }],
                        "key12": 34,
                        "key13": {
                            "key14": true
                        }
                    }
                }
            }
        }, undefined, 2);

        vm.diffObject = {};

        vm.textAreaChange = function (event, leftOrRight) {
            switch (leftOrRight) {
                case 'left':
                    vm.leftJson = JSON.stringify(JSON.parse(vm.leftJson), undefined, 2);
                    break;
                case 'right':
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

        /**
         * Compare 2 objects
         */
        vm.compareAndGetDiffJson = function (leftJson, rightJson) {
            var leftJsonObj = JSON.parse(leftJson);
            var righJsonObj = JSON.parse(rightJson);
            var leftStringArray = parseKeys(leftJsonObj);
            var rightStringArray = parseKeys(righJsonObj);
            for (var index = 0; index < rightStringArray.length; index++) {
                var rightString = rightStringArray[index];
                /** check if the left JSON contains this property */
                if (checkPropertyPathUsingEval(leftJsonObj, rightString)) {
                    /** check if the value is same on the right json */
                    var checkBool = eval(cleanStringForCompare('leftJsonObj' + rightString)) === eval(cleanStringForCompare('righJsonObj' + rightString));
                    if (!checkBool) {
                        vm.assignValTo(rightString, righJsonObj);
                    }
                } else {
                    vm.assignValTo(rightString, righJsonObj);
                }
            }
            vm.diffObjectString = JSON.stringify(vm.diffObject, undefined, 2);
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

        vm.assignValTo = function (propString, rightJson, diffObjVariableName) {
            var _diffObjVariableName = diffObjVariableName || 'vm.diffObject';
            if (vm.checkAndCreatePropertyIfNeeded(propString))
                eval(_diffObjVariableName + propString + '= rightJson' + propString);
            console.log(vm.diffObject);
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