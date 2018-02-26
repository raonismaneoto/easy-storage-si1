'use strict';

function User(data) {
    _.extend(this, data);
}

User.prototype.isAdmin = function () {
    return this.userName && !_.isEmpty(this.userName) && this.permission === "ADMIN";
}