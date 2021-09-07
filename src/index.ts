import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the search-replace extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'search-replace:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension search-replace is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('search-replace settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for search-replace.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The search_replace server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;