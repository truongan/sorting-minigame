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
            
    document.querySelectorAll('.btn').forEach(element => {
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
        card.innerHTML = '<div class="card">        <div class="card-header">            <h5 class="card-title">box ' + index + '</h5>        </div>        <div class="card-body draggable-dropzone--occupied">            <a href="#" class="btn btn-lg btn-primary" data-val="'+ Math.floor(Math.random()*size*3 + 1) +'"> x </a>        </div>    </div>';
        
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



}
window.onload = function(){

	new_game();

    // document.querySelector('#size').addEventListener('change', new_game);

};
