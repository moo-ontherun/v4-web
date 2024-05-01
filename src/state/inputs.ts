import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import assign from 'lodash/assign';

import type {
  AdjustIsolatedMarginInputs,
  InputError,
  Inputs,
  Nullable,
  TradeInputs,
  ClosePositionInputs,
  TransferInputs,
  TriggerOrdersInputs,
} from '@/constants/abacus';
import { CLEARED_SIZE_INPUTS, CLEARED_TRADE_INPUTS } from '@/constants/trade';

type TradeFormInputs = typeof CLEARED_TRADE_INPUTS & typeof CLEARED_SIZE_INPUTS;

export interface InputsState {
  current?: Nullable<string>;
  inputErrors?: Nullable<InputError[]>;
  tradeFormInputs: TradeFormInputs;
  tradeInputs?: Nullable<TradeInputs>;
  closePositionInputs?: Nullable<ClosePositionInputs>;
  triggerOrdersInputs?: Nullable<TriggerOrdersInputs>;
  transferInputs?: Nullable<TransferInputs>;
  adjustIsolatedMarginInputs?: Nullable<AdjustIsolatedMarginInputs>;
}

const initialState: InputsState = {
  current: undefined,
  inputErrors: undefined,
  tradeFormInputs: {
    ...CLEARED_TRADE_INPUTS,
    ...CLEARED_SIZE_INPUTS,
  },
  tradeInputs: undefined,
  transferInputs: undefined,
  adjustIsolatedMarginInputs: undefined,
};

export const inputsSlice = createSlice({
  name: 'Inputs',
  initialState,
  reducers: {
    setInputs: (state, action: PayloadAction<Nullable<Inputs>>) => {
      const {
        current,
        errors,
        trade,
        closePosition,
        transfer,
        triggerOrders,
        adjustIsolatedMargin,
      } = action.payload || {};

      return {
        ...state,
        current: current?.rawValue,
        inputErrors: errors?.toArray(),
        tradeInputs: trade,
        closePositionInputs: closePosition,
        adjustIsolatedMarginInputs: adjustIsolatedMargin,
        transferInputs: {
          ...transfer,
          isCctp: !!transfer?.isCctp,
        } as Nullable<TransferInputs>,
        triggerOrdersInputs: triggerOrders,
      };
    },

    setTradeFormInputs: (state, action: PayloadAction<Partial<TradeFormInputs>>) => {
      state.tradeFormInputs = assign({}, state.tradeFormInputs, action.payload);
    },
  },
});

export const { setInputs, setTradeFormInputs } = inputsSlice.actions;
