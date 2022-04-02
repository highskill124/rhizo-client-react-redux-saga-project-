import React from 'react';

import { PublicApiType } from './createApi';

export const VisibilityContext = React.createContext<PublicApiType>({} as PublicApiType);
