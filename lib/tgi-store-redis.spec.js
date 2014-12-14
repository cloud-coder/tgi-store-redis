/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-redis/lib/tgi-store-redis.spec.js
 */
/**
 * Doc Intro
 */
spec.test('lib/tgi-store-redis.spec.js', 'redis', '', function (callback) {
  var coreTests = spec.mute(false);
  spec.heading('RedisStore', function () {
    spec.paragraph('The RedisStore handles data storage via redis.');
    spec.paragraph('Core tests run: ' + JSON.stringify(coreTests));
    spec.heading('CONSTRUCTOR', function () {
      spec.heading('Store Constructor tests are applied', function () {
        spec.runnerStoreConstructor(RedisStore,true);
      });
      spec.example('objects created should be an instance of RedisStore', true, function () {
        return new RedisStore() instanceof RedisStore;
      });
    });
    spec.heading('Store tests are applied', function () {
      spec.runnerStoreMethods(RedisStore,true);
      spec.runnerListStoreIntegration(RedisStore);
    });
  });
});
