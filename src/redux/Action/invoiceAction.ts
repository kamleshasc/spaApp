import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post, put} from '../../service/Apis';

export const fetchInvoice = createAsyncThunk(
  'getInvoice',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/invoices'});
      if (res?.success) {
        if (res?.data.length <= 0) {
          return rejectWithValue('No Data Found.');
        }
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface InvoiceBody {
  client: string;
  employee: string;
  branch: string;
  selectedService: string[];
  dateOfInvoice: string;
  invoiceNumber: string;
  total: number;
  taxValue: number;
  taxPercentage: number;
  finalTotal: number;
}

export const fetchAddInvoice = createAsyncThunk(
  'addInvoice',
  async (payload: InvoiceBody, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/invoices', body: payload});
      if (res?.success) {
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface UpdateInvoiceBody {
  invoiceId: string;
  payload: InvoiceBody;
}

export const fetchUpdateInvoice = createAsyncThunk(
  'updateInvoice',
  async ({invoiceId, payload}: UpdateInvoiceBody, {rejectWithValue}) => {
    try {
      const res = await put({url: `/invoices/${invoiceId}`, body: payload});
      if (res?.success) {
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface GetInvoicePdf {
  invoiceId: string;
}
export const fetchPdfById = createAsyncThunk(
  'getPdfById',
  async ({invoiceId}: GetInvoicePdf, {rejectWithValue}) => {
    try {
      const res = await get({url: `/invoices/pdf/${invoiceId}`});
      if (res?.success) {
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
