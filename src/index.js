import React, { Component } from "react";

//Check if intersection observer is supported
const isSupported =
  typeof window !== "undefined"
    ? "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    : false;

class ViewportObserver extends Component {
  static defaultProps = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasIntersected: false,
    };
    this.isIntersecting = this.isIntersecting.bind(this);
    this.addObserver = this.addObserver.bind(this);
    this.observer = null;
  }

  componentDidMount() {
    this.setState({
      hasIntersected: !isSupported,
    });
    this.addObserver();
  }

  isIntersecting(entries) {
    entries.forEach((entry) => {
      this.setState({
        hasIntersected: entry.isIntersecting,
      });
      if (entry.isIntersecting) {
        this.removeObserver();
      }
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.addObserver();
  }

  addObserver() {
    if (!this.observer && isSupported) {
      this.observer = new IntersectionObserver(this.isIntersecting, {
        rootMargin: this.props.rootMargin,
        threshold: this.props.threshold,
      });
      this.observer.observe(this.node);
    }
  }

  removeObserver() {
    if (this.observer) {
      this.observer.unobserve(this.node);
      this.observer = null;
    }
  }

  componentWillUnmount() {
    this.removeObserver();
  }

  render() {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        ref={(node) => (this.node = node)}
      >
        {this.props.children(this.state.hasIntersected)}
      </div>
    );
  }
}

export default ViewportObserver;
