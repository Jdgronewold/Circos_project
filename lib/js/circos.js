

class Circos {
  constructor(data, config) {
    this.data = data;
    this.circos = new circosJS({
      container: '#chart',
      width: 500,
      height: 500
    });

    this.config = config;
  }

  buildInstance() {
    return (
      this.circos.layout(this.config, this.data)
    );
  }
}

module.exports = Circos;
