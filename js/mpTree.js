var palette = ["#a6cee3","#f2fc6c","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#9e9fe3","#cab2d6","#6a3d9a","#ffff99","#b15928"];



var nodes = [ {
    id : "Mala Praxis",
    label : "Mala Praxis",
    shape : "circle",
    value: 4,
    mass: 5,
    color : palette[2]
    // icon: {
    //   face: 'FontAwesome',
    //   code: '\uf085',
    //   color: "#000000",
    //   size: 100
    // }
} ];
var edges = [];

function fixData(parent, children, depth, color) {

    for ( child of children ) {
        if ( depth >= 3 ) {
            child.value = 1;
        }

        nodes.push( {
            id : child.id,
            label : child.id,
            // group : "Algo",
            shape : child.shape ? child.shape : "dot",
            value : child.value ? child.value : 2,
            mass : Math.pow(1.2, 3 - depth),
            color : child.color ? palette[child.color] : palette[color],
            font : {
                color: child.value >= 3 ? "#000000" : "#FFFFFF"
            }
        } );

        edges.push( {
            from : parent,
            to : child.id
        } );

        if ( child.children ) {
            fixData( child.id, child.children, depth + 1,  child.color ? child.color : color);
        }
    }
}
fixData("Mala Praxis", dataMP.children, 0, 0);

// create a network
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes : {
        scaling : {
            min : 10,
            label : {
                enabled : true
            }
        },
        font : {
            face : "Liberation Sans",
            // color : "#FFFFFF"
        }
    },
    edges : {
        smooth : {
            type : "cubicBezier"
        }
    },
    physics : {
        // enabled : false
        // solver : "repulsion",
        stabilization : {
            enabled : false
        },
        adaptiveTimestep : false
    },
    interaction : {
        zoomView : false
    }
    // groups: {
    //   "Algo": {
    //     shape: 'icon',
    //     icon: {
    //       face: 'FontAwesome',
    //       code: '\uf219',
    //       size: 50,
    //       color: '#57169a'
    //     }
    //   }
    // }
  };
var network = null;

function createNetwork() {
    if ( network == null ) {
        network = new vis.Network(container, data, options);
    }
}
