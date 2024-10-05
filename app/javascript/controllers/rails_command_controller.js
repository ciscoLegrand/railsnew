import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [
    'input', 'output', 'preset', 'database', 'housekeeping', 'pipeline',
    'javascript', 'css', 'railsComponents', 'tests', 'advanced', 'versionControl'
  ]

  connect() {
    console.log('FlagCommandController connected!')
    this.updateOutput()
  }

  updateOutput() {
    const appName = this.getAppName();
    const presetCommand = this.getPresetCommand();

    let pipelineCommand = '';
    let javascriptCommand = '';
    let cssCommand = '';
    
    if (presetCommand !== '--api') {
      pipelineCommand = this.getPipelineCommand();
      javascriptCommand = this.getJavascriptCommand();
      cssCommand = this.getCssCommand();
    }
    
    const databaseCommand = this.getDatabaseCommand();
    const housekeepingCommand = this.getHousekeepingCommand();
    const railsComponentsCommand = this.getRailsComponentsCommand();
    const testCommand = this.getTestCommand();
    const advancedCommand = this.getAdvancedCommand();
    const versionControlCommand = this.getVersionControlCommand();
    const rubyCommand = this.getRubyCommand();
    const templateCommand = this.getTemplateCommand();
  
    this.outputTarget.innerHTML = `
      <span class='text-green-600'>$ </span>
      <span class='text-red-500'>rails</span> 
      <span class='text-red-700'>new</span>
      <span class='text-green-500'>${appName}</span>
      <span class='text-yellow-300'>
        ${presetCommand}
        ${databaseCommand}
        ${housekeepingCommand}
        ${pipelineCommand}
        ${javascriptCommand}
        ${cssCommand}
        ${railsComponentsCommand}
        ${testCommand}
        ${advancedCommand}
        ${versionControlCommand}
        ${rubyCommand}
        ${templateCommand}
      </span>
    `;
  }

  updateCheckboxesBasedOnPreset() {
    const presetCommand = this.getPresetCommand();
  
    const flagsToSkip = [
      'active-job',
      'action-mailer',
      'action-mailbox',
      'active-storage',
      'action-text',
      'javascript',
      'hotwire',
      'action-cable',
      'bootsnap',
      'dev-gems',
      'jbuilder',
      'system-test',
      'test'
    ];

    if (presetCommand === '--minimal') {
      this.railsComponentsTargets.forEach(checkbox => {
        if (flagsToSkip.includes(checkbox.value)) {
          checkbox.checked = !checkbox.checked;
        }
      });
      this.testsTargets.forEach(checkbox => {
        if (flagsToSkip.includes(checkbox.value)) {
          checkbox.checked = !checkbox.checked;
        }
      });
    }
  }
  

  getAppName() {
    const appName = this.inputTarget.value.trim().replace(/\s+/g, '-')
    return appName || "myapp";
  }

  getPresetCommand() {
    const selectedPreset = this.presetTargets.find(radio => radio.checked)
    return selectedPreset && selectedPreset.value !== 'preset_none' ? `--${selectedPreset.value}` : ''
  }

  getDatabaseCommand() {
    const selectedDatabase = this.databaseTargets.find(radio => radio.checked)
    return selectedDatabase ? `--database=${selectedDatabase.value}` : ''
  }

  getHousekeepingCommand() {
    const uncheckedFlags = this.housekeepingTargets.filter(checkbox => !checkbox.checked).map(checkbox => checkbox.value)
    return uncheckedFlags.map(flag => `--skip-${flag}`).join(' ')
  }

  getPipelineCommand() {
    const presetCommand = this.getPresetCommand();
    const selectedPipeline = this.pipelineTargets.find(radio => radio.checked)
    if (presetCommand === '--api') return ''
    if (selectedPipeline.value === 'pipeline_none') return '--asset-pipeline=none'
    return selectedPipeline.value ? `--asset-pipeline=${selectedPipeline.value}` : ''
  }

  getJavascriptCommand() {
    const presetCommand = this.getPresetCommand();
    if (presetCommand === '--api') return ''
    const selectedJS = this.javascriptTargets.find(radio => radio.checked)
    return selectedJS.value === 'javascript' ? '--skip-javascript' : `--javascript=${selectedJS.value}`
  }

  getCssCommand() {
    const selectedCss = this.cssTargets.find(radio => radio.checked)
    return selectedCss.value !== 'css_none' ? `--css=${selectedCss.value}` : ''
  }

  getRailsComponentsCommand() {
    const presetCommand = this.getPresetCommand();
    if (presetCommand === '--minimal') return ''

    const defaultSkips = [
      'action-cable',
      'active-job',
      'action-mailbox',
      'action-mailer',
      'active-record',
      'active-storage',
      'action-text',
      'hotwire',
      'jbuilder'
    ];
    
    const checkedFlags = this.railsComponentsTargets.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    const skipCommands = defaultSkips
      .filter(flag => !checkedFlags.includes(flag))
      .map(flag => `--skip-${flag}`)
      .join(' ')
    return skipCommands === '' ? '' : skipCommands
  }

  getTestCommand() {
    const uncheckedFlags = this.testsTargets.filter(checkbox => !checkbox.checked).map(checkbox => checkbox.value)
    return uncheckedFlags.map(flag => `--skip-${flag}`).join(' ')
  }

  getAdvancedCommand() {
    const checkedFlags = this.advancedTargets.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    return checkedFlags.map(flag => `--${flag}`).join(' ')
  }

  getVersionControlCommand() {
    const uncheckedFlags = this.versionControlTargets.filter(checkbox => !checkbox.checked).map(checkbox => checkbox.value)
    return uncheckedFlags.map(flag => `--skip-${flag}`).join(' ')
  }

  getRubyCommand() {
    const rubyPath = this.inputTargets.find(input => input.id === "rubyPath")?.value.trim()
    return rubyPath ? `--ruby=${rubyPath}` : ''
  }

  getTemplateCommand() {
    const templatePath = this.inputTargets.find(input => input.id === "templatePath")?.value.trim()
    return templatePath ? `--template=${templatePath}` : ''
  }
}
