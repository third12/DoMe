import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  Navigator,
  AsyncStorage,
  Picker,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import ModalPicker from 'react-native-modal-picker';
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/homeStyles.js';
class Home extends Component {
	navigate(routeName,data){
		this.props.navigator.push({
			name: routeName,
			data: data,
		});
	}
	constructor(props){
		super(props);
		this.state = {
			tasks: null,
	        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
		this.renderRow = this.renderRow.bind(this);      
	}

	componentWillMount(){
		if(this.props.getTasks()!=null){
			var array = JSON.parse(this.props.getTasks());
		    this.setState({
				tasks: this.props.getTasks(),
				dataSource: this.state.dataSource.cloneWithRows(array),  
		    });
		}
	}

	componentDidUpdate(prevProps, prevState) {
	    if(this.state.tasks!=this.props.getTasks()){
			var array = JSON.parse(this.props.getTasks());
			console.log(array);
		    this.setState({
				tasks: this.props.getTasks(),
				dataSource: this.state.dataSource.cloneWithRows(array),  
		    });
		}
	}

	render() {
		let index = 0;
        const data = [
            { key: index++, section: true, label: 'Category' },
            { key: index++, label: 'Academics' },
            { key: index++, label: 'Shopping' },
            { key: index++, label: 'Work' },
        ];

		return (	
        <View style={styles.parent}> 
          <View style={styles.topContainer}>
            <View style={styles.top1}>
				<View style={styles.header2}>
					<TouchableOpacity onPress={this.navigate.bind(this, "add")}>
						<View style={styles.addIcon} >
							<Icon name="plus" size={20} color="white" />
						</View>
					</TouchableOpacity>              
				</View>

	            <View style={styles.header1}><Text style={styles.homeText}>DO ME !</Text>

	            </View>

	            <View style={styles.header2}>
	            	<ModalPicker
	                    data={data}
	                    onChange={(option)=>{ alert(`Category changed to:  ${option.label}`) }}
	                    style={styles.modalBackground}>
	                    <Icon style={styles.caretIcon} name="caret-down" size={20} color="white" />
	                </ModalPicker>
        
				</View>
            </View>
          </View>
          
          <View style={styles.bottomContainer} >
				<SwipeListView
				dataSource={this.state.dataSource}
				renderRow={(rowData) => this.renderRow(rowData)}
				renderHiddenRow={ data => (
					<View style={styles.rowBack}>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={this.navigate.bind(this, "EditTask",data)}>
							<Text style={styles.backTextWhite}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={()=> this.deleteRow(data) }>
							<Text style={styles.backTextWhite}>Delete</Text>
						</TouchableOpacity>
					</View>
				)}
				leftOpenValue={0}
				rightOpenValue={-150}
				/>		

          </View>
        </View>
	  	);
	}	

	renderRow(data){
		return (

			<View style={styles.rowFront}>
				<CheckBox
				    style={{padding: 10}}
				    onClick={()=>this.onClick(data)}
				    isChecked={data.checked}
				    rightText={data.task}
				/>
			</View>
		);
	}

    onClick(data) {
        data.checked = !data.checked;
        console.log(data);
		this.props.editTask(data);
    }

	deleteRow(data) {
		this.props.deleteTask(data.key);
		// console.log(data.key)
	}

}

module.exports = Home;