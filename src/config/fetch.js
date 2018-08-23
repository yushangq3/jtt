import {
	baseUrl
} from './env'


export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	
	if (window.fetch && method == 'fetch') {
		
		let requestConfig;
		if(type == 'FILE'){
			let formData=new FormData();
			for (var key in data){
	            if(typeof data[key]=='object'&& key!="file"){
	        	   for(var k in data[key]){
	        	   		if(typeof data[key][k]=='object'){
	        	   			for(var j in data[key][k]){
	        	   				let value='';
	        	   				if(data[key][k][j]){
	        	   					value=data[key][k][j]
	        	   				}
	        	   			  formData.append(key+'['+k+']['+j+']',value)
			        	   	}
	        	   		}else{
	        	   			let value2='';
	        	   			 if(data[key][k]){
        	   					value2=data[key][k]
        	   				}
	        	   			 formData.append(key+'['+k+']',value2)
	        	   		}
	        	   }
	        	}else{
	        		 formData.append(key,data[key]);
	        	}
	        }
			requestConfig = {
				credentials: 'include',
				method: 'POST',
				mode: "cors",
				cache: "force-cache"
			}
			Object.defineProperty(requestConfig, 'body', {
				value: formData
			})
		}else{
			if (type == 'POST') {
				let params = [];

		        for (var key in data){
		        	if(typeof data[key]=='object'){
		        	   for(var k in data[key]){
		        	   		if(typeof data[key][k]=='object'){
		        	   			for(var j in data[key][k]){
		        	   			 params.push(key+'['+k+']['+j+']'+ '=' +data[key][k][j])
				        	   	}
		        	   		}else{
		        	   			 params.push(key+'['+k+']'+ '=' +data[key][k])
		        	   		}
		        	   }
		        	}else{
		        	params.push(key + '=' + data[key]);
		        	}
		        }
		        let postData = params.join('&');
		        requestConfig = {
					credentials: 'include',
					method: type,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					mode: "no-cors",
					cache: "no-cache"
				}
				Object.defineProperty(requestConfig, 'body', {
					value: postData
				})
			}
		}
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson;
		} 
		catch (error) {
			console.log(error,'error')
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			
			let sendData = '';
			let contentType='application/x-www-form-urlencoded';
			if (type == 'POST') {
				
				let params = [];
		        for (var key in data){
		            params.push(key + '=' +data[key]);
		        }
		        sendData = params.join('&');
			}else if(type == 'FILE'){
				 sendData=new FormData();
				for (var key in data){
		            sendData.append(key,data[key]);
		        }
				type='POST'
				contentType=false;
			}

			requestObj.open(type, url, true);
			if(contentType){
				requestObj.setRequestHeader("Content-type", contentType);
			}
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						console.log(requestObj)
						reject(requestObj)
					}
				}
			}
		})
	}
}