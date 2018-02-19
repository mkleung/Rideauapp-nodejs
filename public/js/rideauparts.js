var RideauParts = React.createClass({

getInitialState: function(){
	return({
	
	});
},

/* Page is loaded */
componentDidMount: function() {
	fetch('http://localhost:8000/api/list').then(function(data){
		return data.json();
	}).then( json => {
        this.setState({
            rideauparts: json
        });
    });
  },

render: function(){

		var rideauparts = this.state.rideauparts;

		if (rideauparts != null) {

			rideauparts = rideauparts.map(function(rideaupart, index){
           
           switch(rideaupart.condition) {
			    case "Excellent":
			    	var colorClass = "has-text-info";
			    	break;
			    case "Good":
			        var colorClass = "has-text-success";
			        break;
			    case "Fair":
			        var colorClass = "has-text-primary";
			        break;
			    case "Poor":
			    	var colorClass = "has-text-warning";
			    	break;
			    case "Closed":
			    	var colorClass = "has-text-danger";
			    	break;
			    default:
			        var colorClass = "has-text-danger";
			}


            var rideauLength = (rideaupart.length).trim();
            return (
            	<tr key={index}>
			      <td>{rideaupart.title}</td>
			       <td>{rideauLength}</td>
			      <td><strong><span className={colorClass}>{rideaupart.condition}</span></strong></td>
			    </tr>
           );
        });
		}
   return(
		<table className="table is-striped">
		  <thead>
		    <tr>
		      <th>Title</th>
		      <th>Length</th>
		      <th>Condition</th>
		    </tr>
		  </thead>
		  <tbody>
		    	{rideauparts}
		  </tbody>
		</table>
	);
},
});

ReactDOM.render(<RideauParts />, document.getElementById('rideauparts'));