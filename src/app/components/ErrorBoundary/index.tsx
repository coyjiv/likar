import React, { Component, ErrorInfo } from 'react';
import { alert } from '@/utils/alert';

class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to the console or send it to a logging service
    console.error(error, errorInfo);
    // Show the error using your alert function
    alert('Щось пішло не так, спробуйте перезавантажити сторінку...', 'error');
  }

  render() {
    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;