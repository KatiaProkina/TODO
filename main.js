(function (){
    //создаем и возвращаем заголовок приложения
    function createAppTitle(title){
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm(){
    let form = document.createElement('form')
    let input = document.createElement('input')
    let buttonWrapper = document.createElement('div')
    let button = document.createElement('button')

    form.classList.add('input-group','mb-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название нового дела'
    buttonWrapper.classList.add('input-group-append')
    button.classList.add('btn','btn-primary')
    button.textContent = 'Добавить дело'

    buttonWrapper.append(button)
    form.append(input)
    form.append(buttonWrapper)


    //<form class='input-group mb-3'>
    //<input class = ' form-control' placeholder = 'Введите название нового дела'>
    //<div class = 'input-group-append'
       // <button class = 'btn' btn-primary'>Добавить дело </button>
    //</div>
    //</form>

    return(
        form,
        input,
        button
    )}
    

    //создаем и возвращаем список элементов
    function createTodoList(){
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function createTodoItem(name){
        let item = document.createElement('li')
        //кнопки помещаем в элемент, который красиво покажет их в группе
    
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')
    
        //устанавливаем стили для элемента списка, а так же для размещения кнопок
        //в его правой части с помощью flex
    
        item.classList.add('list-group-item','d-flex','justify-content-between','align-item-center')
        item.textContent = name
    
        buttonGroup.classList.add('btn-group','btn-group-sm')
        doneButton.classList.add('btn','btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add = ('btn','btn-danger')
        deleteButton.textContent = 'Удалить'
    
        //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)
    
        //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return{
            item,
            doneButton,
            deleteButton
        }
    
    }

    document.addEventListener('DOMContentLoaded',function(){
        let container = document.getElementById('todo-app')

        let todoAppTitle = createAppTitle ('Список дел')
        let todoItemForm = createTodoItemForm ()
        let todoList = createTodoList()
        container.append (todoAppTitle)
        container.append (todoItemForm.form)
        container.append (todoList)
      
        //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener ('submit', function (e){
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            //в данном случае мы не хотим, чтобы страница перезагружалась при отправке форм
            e.preventDefault()

            //игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value){
                return
            }
          

        let todoItem = createTodoItem(todoItemForm.input.value)

        //добавляем обработчик на кнопки
        todoItem.doneButton.addEventListener('click',function(){
            todoItem.item.classList.toggle('list-group-item-success')
        })
        todoItem.deleteButton.addEventListener('click',function (){
            if(confirm('Вы уверены?')){
                todoItem.item.remove()
            }
        })
            // создаем и добавляем новое дело из поля для ввода
            todoList.append(todoItem.item)
     
            //обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = ''
        })
    })
  
    
})()