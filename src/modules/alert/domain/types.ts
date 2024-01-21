import type { Component } from 'vue';

import type { UUID } from '@/shared/uuid';

export enum AlertType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface Alert<T = AlertType> {
  id: UUID,
  type: T;
  message: string;
  title?: string;
  closable?: boolean;
  component?: Component;
}

export type AlertOptions = Omit<Alert, 'type' | 'id'>;
