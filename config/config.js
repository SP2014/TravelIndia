module.exports={
	'port' : process.env.OPENSHIFT_NODEJS_PORT || 8080,
	'ipaddress' : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
	'database':process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || '127.0.0.1:27017/' + 'travelIndia',
	'secret' : '',
	'isLocal' : false
};