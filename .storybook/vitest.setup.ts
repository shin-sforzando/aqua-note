import { setProjectAnnotations } from '@storybook/sveltekit';
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import * as previewAnnotations from './preview';

const annotations = setProjectAnnotations([a11yAddonAnnotations, previewAnnotations]);

export default annotations;
