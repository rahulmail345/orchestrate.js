// Copyright 2014 Orchestrate, Inc.
/**
 * @fileoverview Test misc methods
 */

// Module Dependencies.
var assert = require('assert');
var token = require('./creds').token;
var db = require('../lib-cov/client')(token);
var users = require('./testdata');
var Q = require('kew');
var util = require('util');


suite('Misc', function () {
  suiteSetup(function (done) {
    users.reset(function(res) {
      if (!res) {
        users.insertAll(done);
      } else {
        done(res);
      }
    });
  });

  // Collection deletion
  test('Collection deletion', function(done) {
    db.deleteCollection('users')
      .then(function(res) {
        assert.equal(204, res.statusCode);
        done();
      })
      .fail(function(res) {
        done(res);
      });
  });

  // Service ping
  test('Service ping', function(done) {
    db.ping()
      .then(function (res) {
        assert.equal(200, res.statusCode);
        var db2 = require('../lib-cov/client')("badtoken");
        return db2.ping();
      })
      .fail(function (res) {
        assert.equal(401, res.statusCode);
        done();
      });
  });
});
