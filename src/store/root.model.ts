import { Models } from '@rematch/core';

import { image } from './models/image.model';

export interface RootModel extends Models<RootModel> {
  image: typeof image;
}

export const models: RootModel = { image };
