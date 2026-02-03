import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';

// dotenvの設定
require('dotenv').config();

jestPreviewConfigure({ autoPreview: false });
