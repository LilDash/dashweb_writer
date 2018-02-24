require('../../../public/lib/ueditor/ueditor.config.js')
require('../../../public/lib/ueditor/ueditor.all.min.js')
require('../../../public/lib/ueditor/lang/zh-cn/zh-cn.js')

import * as React from 'react';
import EventManager from '../../services/utils/EventManager';

import PropTypes from 'prop-types';

export class UEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ue: null,
      eventListener: null,
    };
  }
  componentDidMount() {
    this.initEditor()
  }
  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
    EventManager.removeListener(this.state.eventListener);
  }

  initEditor() {
    const id = this.props.id;
    const ueEditor = UE.getEditor(this.props.id, {
      'UEDITOR_HOME_URL': '/lib/ueditor/',
      'serverUrl': this.props.serverUrl,
      'charset': 'utf-8',
    });
    const self = this;
    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }

      self.state.eventListener = EventManager.addListener("get_editor_content", (cb) => {
        const content = self.state.ue.getContent();
        cb(content);
      })

      
    });
    this.setState({ue: ueEditor});
  }

  setContent(content) {
    if (this.state.ue){
      this.state.ue.setContent(content);
    }
  }

  render() {
    return (
      <div id={this.props.id} name="content" type="text/plain" />
    )
  }


}

UEditor.propTypes = {
  id: PropTypes.string,
  serverUrl: PropTypes.string,

};

UEditor.defaultProps = {
};