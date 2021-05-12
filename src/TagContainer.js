import React from 'react';
import Tag from './Tag';
import './TagContainer.css';

class TagContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTag: "",
            tags: []
        }

        this.addToTags = this.addToTags.bind(this);
        this.onChange = this.onChange.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    removeTag(tag) {
        let previousTags = this.state.tags;
        const isRemoveIndex = (element) => element === tag;
        const removeIndex = previousTags.findIndex(isRemoveIndex);
        previousTags.splice(removeIndex, 1);
        this.setState({
          tags: previousTags
        });    
    }

    onChange(event) {
        this.setState({
          currentTag: event.target.value
        });
    }    

    addToTags(event) {
        event.preventDefault();
        let previousTags = this.state.tags;
        const lowerCaseTags = previousTags.map((tag) => {
            return tag.toLowerCase();
        });
        if (lowerCaseTags.includes(this.state.currentTag.toLowerCase())) {
            this.setState({
                currentTag: ''
            });
            return;
        }
        previousTags.push(this.state.currentTag);
        this.setState({
            tags: previousTags,
            currentTag: ''
        });
    }

    render() {  
        const listItems = this.state.tags.map((tag) => {
            return <Tag name={tag} onClick={(e) => this.removeTag(tag)}/>
        });
      
        return (
            <div id='tagContainer'>
            {listItems}
            <form onSubmit={this.addToTags}>
                <input type="text" value={this.state.currentTag} onChange={this.onChange}/>
                <input type="Submit" value="Submit" style={{display: "none"}}/>
            </form>
            </div>
        )
    }
}

export default TagContainer;