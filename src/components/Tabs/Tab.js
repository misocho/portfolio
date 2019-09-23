import React, { Component } from 'react';

class Tab extends Component {
  componentDidMount() {
    this.props.addTab({
      id: this.props.id,
      title: this.props.title
    });
  }

  render() {
    return this.props.activeTab.id === this.props.id && this.props.children;
  }
}

export default Tab;