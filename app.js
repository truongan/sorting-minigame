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
    // $('.item').text('x');
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
        card.innerHTML = '<div class=""><div class="card m-2">        <div class="card-header">            <h5 class="card-title">box ' + index + '</h5>        </div>        <div class="card-body draggable-dropzone--occupied">            <a id="btn'+ index + '" href="#" class="btn btn-lg btn-primary item" data-val="'+ Math.floor(Math.random()*size*3 + 1) +'"> x </a>        </div>    </div> </div>';
        
        target.appendChild(card.firstChild);
    }


    // const draggable = new Draggable.Droppable(document.querySelectorAll('.card-body'), {
    //     draggable: '.drag'
    //     ,dropzone: '.card-body'
    // });

    // draggable.on('drag:start', (e) => show_button(e.source));
    // draggable.on('drag:move', () => console.log('drag:move'));
    // draggable.on('drag:stop', (e) => show_button(e.source));


    $('.item').click(function(ev){
        show_button(ev.target);
    })
    $('.btn').bind('dragstart', function(event){
        ev = event.originalEvent;
        // show_button(ev.target);
        ev.dataTransfer.setData('text', ev.target.id);
        console.log(ev);
        console.log(ev.target.id);
    });

    $('.card-body').bind('dragover',function(event){
        event.preventDefault();
    })

    $('.card-body').bind('drop',function(event){
        ev = event.originalEvent;
        console.log(ev);
        // target = $(document.getElementById(ev.dataTransfer.getData('text')));
        // parent 
        drag = document.getElementById(ev.dataTransfer.getData('text'));
        ev.target.appendChild(drag)

        // ev.dataTransfer.clearData();
    })

    
    // $('.card-body').bind('click',function(event){
    //     console.log('binded');
    // })
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

        document.querySelectorAll('.item').forEach(element => {
            element.innerText = element.dataset['val'];
        });
    }


}
window.onload = function(){

	new_game();

    document.querySelector('#size').addEventListener('change', new_game);

};
