(function () {
  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.setAttribute("disabled", true);
    input.addEventListener("input", function () {
      if (input.value === "") {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    //<form class='input-group mb-3'>
    //<input class = ' form-control' placeholder = 'Введите название нового дела'>
    //<div class = 'input-group-append'
    // <button class = 'btn' btn-primary'>Добавить дело </button>
    //</div>
    //</form>

    return {
      form,
      input,
      button,
    };
  }

  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoApp(container, title = "Список дел", key) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let localTodo = [];
    function getObject() {
      if (localStorage.getItem(key)) {
        localTodo = JSON.parse(localStorage.getItem(key));
      } else {
        localTodo = [];
      }
    }
    getObject();
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    localTodo.forEach((item) => {
      let newItem = createTodoItem(item);
      todoList.append(newItem.item);
    });

    //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function s(e) {
      //эта строчка необходима, чтобы предотвратить стандартное действие браузера
      //в данном случае мы не хотим, чтобы страница перезагружалась при отправке форм
      e.preventDefault();

      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }
      let todo = {
        name: todoItemForm.input.value,
        done: false,
      };
      let todoItem = createTodoItem(todo);

      localTodo.push(todo);
      localStorage.setItem(key, JSON.stringify(localTodo));

      // создаем и добавляем новое дело из поля для ввода
      todoList.append(todoItem.item);

      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true;
    });

    function createTodoItem(object) {
      let item = document.createElement("li");
      //кнопки помещаем в элемент, который красиво покажет их в группе

      let buttonGroup = document.createElement("div");
      let doneButton = document.createElement("button");
      let deleteButton = document.createElement("button");

      //устанавливаем стили для элемента списка, а так же для размещения кнопок
      //в его правой части с помощью flex

      item.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-item-center"
      );
      item.textContent = object.name;

      //добавляем обработчик на кнопки
      doneButton.addEventListener("click", function () {
        item.classList.toggle("list-group-item-success");
        for (let i = 0; i < localTodo.length; i++) {
          if (localTodo[i] === object) {
            localTodo[i].done = true;
          } else {
            localTodo[i].done = false;
          }
          console.log(localTodo);
          localTodo.slice(i);
          localStorage.setItem(key, JSON.stringify(localTodo));
        }
      });
      deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          for (let i = 0; i < localTodo.length; i++) {
            if (localTodo[i].name === object.name) {
              localTodo.splice(i, 1);
              localStorage.setItem(key, JSON.stringify(localTodo));
            }
          }
        }
        item.remove();
      });

      buttonGroup.classList.add("btn-group", "btn-group-sm");
      doneButton.classList.add("btn", "btn-success");
      doneButton.textContent = "Готово";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.textContent = "Удалить";

      //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
      return {
        item,
        doneButton,
        deleteButton,
      };
    }
  }

  window.createTodoApp = createTodoApp;
})();
