/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-redis/lib/tgi-store-redis.source.js
 */

// Constructor
var RedisStore = function (args) {
  if (false === (this instanceof RedisStore)) throw new Error('new operator required');
  args = args || {};
  this.storeType = args.storeType || "RedisStore";
  this.name = args.name || 'a ' + this.storeType;
  this.storeProperty = {
    isReady: false,
    canGetModel: true,
    canPutModel: true,
    canDeleteModel: true,
    canGetList: true
  };
  var unusedProperties = getInvalidProperties(args, ['name', 'storeType']);
  var errorList = [];
  for (var i = 0; i < unusedProperties.length; i++) errorList.push('invalid property: ' + unusedProperties[i]);
  if (errorList.length > 1) throw new Error('error creating Store: multiple errors');
  if (errorList.length) throw new Error('error creating Store: ' + errorList[0]);
  if (RedisStore._connection) {
    this.storeProperty.isReady = true;
    this.storeProperty.canGetModel = true;
    this.storeProperty.canPutModel = true;
    this.storeProperty.canDeleteModel = true;
    this.redisServer = RedisStore._connection.redisServer;
    this.redisDatabase = RedisStore._connection.redisDatabase;
  }
};
RedisStore.prototype = Object.create(Store.prototype);
// Methods
RedisStore.prototype.onConnect = function (location, callBack, options) {
  if (typeof location != 'string') throw new Error('argument must a url string');
  if (typeof callBack != 'function') throw new Error('argument must a callback');

  var redis;
  if (options) {
    redis = options.vendor;
  } else {
    if (RedisStore._connection) {
      redis = RedisStore._connection.redis;
    }
  }

  // Open Redis database
  var store = this;
  try {
    throw new Error('Doug: need to code connect');
    // mongo code
    //store.redisServer = new redis.Server('127.0.0.1', 27017, {auto_reconnect: true});
    //store.redisDatabase = new redis.Db('tequilaStore', this.redisServer, {safe: true});
    //store.redisDatabase.open(function (err, db) {
    //  if (err) {
    //    callBack(store, err);
    //    try {
    //      store.redisDatabase.close();  // Error will retry till close with auto_reconnect: true
    //    }
    //    catch (catchError) {
    //      //console.log('error closing when fail open: ' + catchError);
    //    }
    //  } else {
    //    store.storeProperty.isReady = true;
    //    store.storeProperty.canGetModel = true;
    //    store.storeProperty.canPutModel = true;
    //    store.storeProperty.canDeleteModel = true;
    //    if (options && options.keepConnection) {
    //      RedisStore._connection = {
    //        Redis: Redis,
    //        RedisServer: store.redisServer,
    //        RedisDatabase: store.redisDatabase
    //      };
    //    }
    //    callBack(store);
    //  }
    //});

  }
  catch (err) {
    callBack(store, err);
  }

};
RedisStore.prototype.putModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callBack required');
  var store = this;
  var a;

  throw new Error('Doug: need to code putModel');

/* mongo code FYI
  store.redisDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      //console.log('putModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    // put name value pairs into modelData
    var modelData = {};
    var newModel = false;
    var id = model.attributes[0].value;
    if (id && typeof id != 'string') { // todo - cheese to pass test
      callBack(model, new Error('model not found in store'));
      return;
    }
    for (a in model.attributes) {
      if (model.attributes.hasOwnProperty(a)) {
        if (model.attributes[a].name == 'id') {
          if (!model.attributes[a].value)
            newModel = true;
        } else {
          if (model.attributes[a].value && model.attributes[a].type == 'ID') {
            modelData[model.attributes[a].name] = RedisStore._connection.redis.ObjectID.createFromHexString(model.attributes[a].value);
          } else {
            modelData[model.attributes[a].name] = model.attributes[a].value;
          }
        }
      }
    }
    if (newModel) {
//      console.log('collection.insert (modelData): ' + JSON.stringify(modelData));
      collection.insert(modelData, {safe: true}, function (err, result) {
        if (err) {
          //console.log('putModel insert error: ' + err);
          callBack(model, err);
        } else {
          // Get resulting data
          for (a in model.attributes) {
            if (model.attributes.hasOwnProperty(a)) {
              if (model.attributes[a].name == 'id')
                model.attributes[a].value = modelData._id.toString();
              else if (modelData[model.attributes[a].name] && model.attributes[a].type == 'ID')
                model.attributes[a].value = (modelData[model.attributes[a].name]).toString();
              else
                model.attributes[a].value = modelData[model.attributes[a].name];
            }
          }
          callBack(model);
        }
      });
    } else {
      id = RedisStore._connection.redis.ObjectID.createFromHexString(id);
      collection.update({'_id': id}, modelData, {safe: true}, function (err, result) {
        if (err) {
          //console.log('putModel update error: ' + err);
          callBack(model, err);
        } else {
          // Get resulting data
          for (a in model.attributes) {
            if (model.attributes.hasOwnProperty(a)) {
              if (model.attributes[a].name != 'id') // Keep original ID intact
                model.attributes[a].value = modelData[model.attributes[a].name];
            }
          }
          callBack(model);
        }
      });
    }
  });

*/

};
RedisStore.prototype.getModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (!model.attributes[0].value) throw new Error('ID not set');
  if (typeof callBack != "function") throw new Error('callBack required');
  var store = this;
  var a;
  var id = model.attributes[0].value;

  throw new Error('Doug: need to code getModel');
  /* mongo code FYI
  if (typeof id == 'string') {
    try {
      id = RedisStore._connection.redis.ObjectID.createFromHexString(id);
    } catch (e) {
      //console.log('getModel createFromHexString error: ' + e);
      callBack(model, e);
    }
  }
  store.redisDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      //console.log('getModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    collection.findOne({'_id': id}, function (err, item) {
      if (err) {
        //console.log('getModel findOne ERROR: ' + err);
        callBack(model, err);
        return;
      }
      if (item === null) {
        callBack(model, Error('model not found in store'));
      } else {
        for (a in model.attributes) {
          if (model.attributes.hasOwnProperty(a)) {
            if (model.attributes[a].name == 'id')
              model.attributes[a].value = item._id.toString();
            else if (item[model.attributes[a].name] && model.attributes[a].type == 'ID')
              model.attributes[a].value = (item[model.attributes[a].name]).toString();
            else
              model.attributes[a].value = item[model.attributes[a].name];
          }
        }
        callBack(model);
      }
    });
  });
  */
};
RedisStore.prototype.deleteModel = function (model, callBack) {
  if (!(model instanceof Model)) throw new Error('argument must be a Model');
  if (model.getObjectStateErrors().length) throw new Error('model has validation errors');
  if (typeof callBack != "function") throw new Error('callBack required');
  var store = this;
  var a;
  var id = model.attributes[0].value;

  throw new Error('Doug: need to code deleteModel');
  /* mongo code FYI
  if (id && typeof id != 'string') { // todo - cheese to pass test
    if (model.modelType == 'PeopleAreString!') {
      callBack(model, new Error('model not found in store'));
    } else {
      callBack(model, new Error('id not found in store'));
    }
    return;
  }
  if (typeof id == 'string') {
    try {
      id = RedisStore._connection.redis.ObjectID.createFromHexString(id);
    } catch (e) {
      //console.log('deleteModel createFromHexString error: ' + e);
      callBack(model, e);
    }
  }
  store.redisDatabase.collection(model.modelType, function (err, collection) {
    if (err) {
      //console.log('deleteModel collection error: ' + err);
      callBack(model, err);
      return;
    }
    collection.remove({'_id': id}, function (err, item) {
      if (err) {
        //console.log('deleteModel remove ERROR: ' + err);
        callBack(model, err);
        return;
      }
      for (a in model.attributes) {
        if (model.attributes.hasOwnProperty(a)) {
          if (model.attributes[a].name == 'id')
            model.attributes[a].value = null;
        }
      }
      callBack(model);
    });
  });
  */
};
RedisStore.prototype.getList = function (list, filter, arg3, arg4) {
  var callBack, order;
  if (typeof(arg4) == 'function') {
    callBack = arg4;
    order = arg3;
  } else {
    callBack = arg3;
  }
  if (!(list instanceof List)) throw new Error('argument must be a List');
  if (!(filter instanceof Object)) throw new Error('filter argument must be Object');
  if (typeof callBack != "function") throw new Error('callBack required');
  var store = this;

  throw new Error('Doug: need to code getList');
/* mongo code FYI

  list.clear();

  // Convert list filter to Redis flavor
  var RedisFilter = {};
  for (var prop in filter) {
    if (filter.hasOwnProperty(prop)) {
//      console.log('prop = ' + prop);
      if (list.model.getAttributeType(prop) == 'ID')
        RedisFilter[prop] = RedisStore._connection.redis.ObjectID.createFromHexString(filter[prop]);
      else
        RedisFilter[prop] = filter[prop];
    }
  }

  store.redisDatabase.collection(list.model.modelType, function (err, collection) {
    if (err) {
      //console.log('getList collection error: ' + err);
      callBack(list, err);
      return;
    }
    if (order) {
      collection.find({query: RedisFilter, $orderby: order}, findCallback);
    } else {
      collection.find(RedisFilter, findCallback);
    }
    function findCallback(err, cursor) {
      if (err) {
        //console.log('getList find error: ' + err);
        callBack(list, err);
        return;
      }
      cursor.toArray(function (err, documents) {
        if (err) {
          //console.log('getList toArray error: ' + err);
          callBack(list, err);
          return;
        }
        for (var i = 0; i < documents.length; i++) {
          documents[i].id = documents[i]._id.toString();
          delete documents[i]._id;
          var dataPart = [];
          dataPart.push(documents[i].id);
          for (var j in documents[i]) {
            if (j != 'id')
              dataPart.push(documents[i][j]);
          }
          list._items.push(dataPart);
        }
        list._itemIndex = list._items.length - 1;
        callBack(list);
      });
    }
  });
  */
};
