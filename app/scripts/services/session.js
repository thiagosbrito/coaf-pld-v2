'use strict';
angular.module('wbaApp')
  .service('Session', function () {
    this.create = function (user, permissions, loggedBuyingEntity, operationPolicy, customerPolicy) {
      this.user               = user;
      this.permissions        = permissions;
      this.loggedBuyingEntity = loggedBuyingEntity;
      this.operationPolicy    = operationPolicy;
      this.customerPolicy     = customerPolicy;
    };
    this.getUser = function () {
      // var obj = {
      //   user:               this.user,
      //   permissions:        this.permissions,
      //   loggedBuyingEntity: this.loggedBuyingEntity,
      //   operationPolicy:    this.operationPolicy,
      //   customerPolicy:     this.customerPolicy
      // };
      // console.log(obj);
      // return obj;
      return this;
    }
    this.destroy = function () {
      this.user               = null;
      this.permissions        = null;
      this.loggedBuyingEntity = null;
      this.operationPolicy    = null;
      this.customerPolicy     = null;
    }
  })