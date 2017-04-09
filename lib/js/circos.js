

class CircosObj {
  constructor(data, config) {
    this.data = data;
    this.circos = new Circos({
      container: '#chart',
      width: 600,
      height: 600
    });

    this.config = config;
  }

  buildInstance() {
    return (
      this.circos.layout( this.data, this.config)
    );
  }
}

module.exports = CircosObj;
