function fix_width(i, size){
	i = String(i);
	size = String(size);
	while(i.length < size.length){
		i = "0" + i;
	}
	return i;
}
exist = false;

function show_button(e){
    console.log(e);
            
    document.querySelectorAll('.item').forEach(element => {
        element.innerText = 'x';
    });

    e.innerText = e.dataset['val'];
}

function new_game(){
    size = parseInt(document.querySelector('#size').value);
    
    var target = document.querySelector('.list-row'); 
    while(target.firstChild) target.removeChild(target.firstChild);
    
    empty = document.querySelector('.empty-box'); 
    while(empty.firstChild) empty.removeChild(empty.firstChild);
    
    for (let index = 0; index < size; index++) {
        var card = document.createElement('div');
        card.innerHTML = '<div class="card">        <div class="card-header">            <h5 class="card-title">box ' + index + '</h5>        </div>        <div class="card-body draggable-dropzone--occupied">            <a href="#" class="btn btn-lg btn-primary item" data-val="'+ Math.floor(Math.random()*size*3 + 1) +'"> x </a>        </div>    </div>';
        
        card.onclick = function(e){
            // show_button(e.target);
        }
        target.appendChild(card);
    }


    const draggable = new Draggable.Droppable(document.querySelectorAll('.card'), {
        draggable: '.btn'
        ,dropzone: '.card-body'
    });

    draggable.on('drag:start', (e) => show_button(e.source));
    draggable.on('drag:move', () => console.log('drag:move'));
    draggable.on('drag:stop', (e) => show_button(e.source));

    document.querySelector('.checkbtn').onclick = function(){
        var target = document.querySelector('.list-row'); 

        var old_val;

        fail = true;
        for (let i = 0; i < target.childNodes.length; i++) {
            const box = target.childNodes[i];
            a = box.querySelector('.item');
            if (a==null) {
                document.querySelector('.modal-body').innerText = 'Too bad, you left a box empty in the main row.';
                $('#myModal').modal('show');
                fail = false;
                console.log('fail 1');
                break;
            }

            val = parseInt(a.dataset['val']);
            console.log(val);
            console.log(a);
            if (i != 0){
                if (val < old_val){
                    console.log(document.querySelector('.modal-body').innerText );
                    document.querySelector('.modal-body').innerText = 'Too bad, Box ' + i + ' is not in order';
                    console.log(document.querySelector('.modal-body').innerText );
                    $('#myModal').modal('show');
                    console.log('fail 2');
                    fail = false;
                    break;
                }
            }
            old_val = val; 
        }

        if (fail){
            document.querySelector('.modal-body').innerText = 'CONGRATULATIONS. YOU DID IT';
            $('#myModal').modal('show');
        }

        
    }


}
window.onload = function(){

	new_game();

    document.querySelector('#size').addEventListener('change', new_game);

};
