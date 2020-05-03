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
        card.innerHTML = '<div class=""><div class="card m-2">        <div class="card-header">            <h5 class="card-title">box ' + index + '</h5>        </div>        <div class="card-body ">            <btn draggable=true id="btn'+ index + '"  class="btn btn-lg btn-primary item" data-val="'+ Math.floor(Math.random()*size*3 + 1) +'"> x </btn></div></div> </div>';
        
        target.appendChild(card.firstChild);
    }



    document.querySelectorAll('.item').forEach(i =>{
        i.addEventListener('click', e => show_button(e.target));
        i.addEventListener('dragstart', ev => {
            ev.dataTransfer.setData('text', ev.target.id);
            console.log(ev);
            console.log(ev.target.id);
        })
    });


    
    document.querySelectorAll('.card-body').forEach(c => {
        c.addEventListener('drop', function(ev){
            console.log(ev);
    
            if (ev.target.tagName != 'DIV') return;
            drag = document.getElementById(ev.dataTransfer.getData('text'));
            console.log(ev.target)
            if (ev.target.children.length == 0){
                ev.target.appendChild(drag);
            }
        });
        c.addEventListener('dragover', (ev) => ev.preventDefault());
    });

    // $(document).on('scroll', function(ev){
    //     console.log(ev);
    //     console.log(new Error().stack);
    // });
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
