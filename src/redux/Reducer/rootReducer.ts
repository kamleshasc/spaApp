import {combineReducers} from 'redux';
import userReducer from './userReducer';
import serviceReducer from './serviceReducer';
import clientReducer from './clientReducer';
import inventoryReducer from './inventoryReducer';
import commissionRuleReducer from './commissionRuleReducer';
import invoiceReducer from './invoiceReducer';
import bookingReducer from './bookingReducer';
import authReducer from './authReducer';
import customerReducer from './customerReducer';
import privacyPolicyReducer from './privacyPolicyReducer';
import otpReducer from './otpReducer';
import paymentReducer from './paymentReducer';
import salesReducer from './salesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer,
  client: clientReducer,
  inventory: inventoryReducer,
  commissionRule: commissionRuleReducer,
  Invoice: invoiceReducer,
  booking: bookingReducer,
  auth: authReducer,
  customer: customerReducer,
  privacyPolicy: privacyPolicyReducer,
  otp: otpReducer,
  payment: paymentReducer,
  sales: salesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
