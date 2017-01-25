

class Circos {
  constructor(data) {
    this.data = data;
    this.circos = new circosJS({
      container: '#chart',
      width: 300,
      height: 300
    });

    this.config = {
      innerRadius: 80,
      outerRadius: 150,
      ticks: {display: true},
      onClick: function(){console.log('You clicked on the layout layer!');}
    };
  }

  buildInstance() {
    return (
      this.circos.layout(this.config, this.data)
    );
  }
}

module.exports = Circos;
