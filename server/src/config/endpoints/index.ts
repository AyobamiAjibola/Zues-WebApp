import authEndpoints from "./auth.endpoints";
import roleEndpoints from "./role.endpoints";
import subscriptionEndpoints from "./subscription.endpoint";
import userEndpoints from "./user.endpoints";
import vendorEndpoints from "./vendor.endpoints";

const endpoints = userEndpoints
    .concat(roleEndpoints)
    .concat(authEndpoints)
    .concat(userEndpoints)
    .concat(vendorEndpoints)
    .concat(subscriptionEndpoints);

export default endpoints;