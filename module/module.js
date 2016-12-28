import overflowTracking from './directive/overflow-tracking.dir';
import * as namespace from './name.const';
angular.module(namespace.moduleName,[])
    .directive(namespace.directiveName,overflowTracking);