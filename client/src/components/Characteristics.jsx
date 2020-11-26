import React from 'react';
import Size from './Size.jsx';
import Width from './Width.jsx';
import Comfort from './Comfort.jsx';
import Quality from './Quality.jsx';
import Length from './Length.jsx';
import Fit from './fit.jsx';
class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCharacteristics: props.stats,
      comfort: props.stats.Comfort || undefined, 
      quality: props.stats.Quality || undefined, 
      size: props.stats.Size || undefined, 
      width: props.stats.Width || undefined, 
      length: props.stats.Length || undefined, 
      fit: props.stats.Fit || undefined
    }
  }


  render () {
    return (
      <div id='characteristics'>
        {this.state.comfort ? <Comfort comfort={this.state.comfort.value} /> : '' }

        {this.state.quality ? <Quality quality={this.state.quality.value} /> : '' }

        {this.state.size ? <Size size={this.state.size.value} /> : ''}

        {this.state.width ? <Width width={this.state.width.value} /> : '' }

        {this.state.fit ? <Fit fit={this.state.fit.value} /> : '' }

        {this.state.length ? <Length length={this.state.length.value} /> : ''}

      </div>
    )
  }
}

export default Characteristics