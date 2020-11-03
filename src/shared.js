module.exports.ForwardToHTMLPage = ForwardToHTMLPage

module.exports.AddTask = AddTask
module.exports.RemoveTask = RemoveTask

function ForwardToHTMLPage(html_page_name) {
    self.location = '../src/' + html_page_name + '.html'
}

function AddTask(base_node, task_params) {
    var contener = CreateElement('div', false, ['id', task_params[0]], false)
    var components_box = CreateElement('div', false, ['id', 'components'], false)

    var task_label = CreateElement('h3', true, ['id', 'title'], task_params[1])

    var done_button = CreateElement('button', false, ['id', 'done'], 'DONE')
    var settings_button = CreateElement('button', false, ['id', 'edit'], 'EDIT')

    AddComponentToComponentsBox(components_box, 'description', task_params[2])

    for(var i = 3; i < task_params.length; i++) {
        AddComponentToComponentsBox(components_box, task_params[i], false)
    }

    task = AppendElementsToTaskWithLineBreak(contener, [
        task_label, false,
        components_box, true,
        done_button, false,
        settings_button, true
    ])

    AppendToRootNode(base_node, task)
}

function CreateElement(html_tag, is_editable, list_of_attributes, inner_html) {
    var element = document.createElement(html_tag)

    for(var i = 0; i < list_of_attributes.length; i += 2) {
        element.setAttribute(list_of_attributes[i], list_of_attributes[i + 1])
    }

    if (is_editable) {
        element.setAttribute('contenteditable', 'false')
    }

    if (inner_html) {
        element.innerHTML += inner_html
    }

    return element
}

function AppendElementsToTaskWithLineBreak(contener, task_elements) {
    for (var i = 0; i < task_elements.length; i += 2) {
        contener.appendChild(task_elements[i])

        if (task_elements[i + 1] == true) {
            contener.innerHTML += '<br>'
        }
    }

    return contener
}

function AppendToRootNode(base_node, task) {
    base_node.appendChild(task)
}

function RemoveTask(element) {
    var base_node = element.parentNode.id
    document.getElementById(base_node).removeChild(element);
}


function AddComponentToTask(target_task, component_name) {
    if(target_task != null) {
        switch(component_name) {
            case 'checklist':
                AddCheckbox(target_task)
                break

            case 'description':
                AddDescription(target_task)
                break
    
            default:
                console.log('ERROR: wrong component name')
        }
    }
    else {
        console.log('ERROR: first set current task, then add component')
    }
}

function AddComponentToComponentsBox(components_box, component_name, task_params) {
    switch(component_name) {
        case 'checklist':
            AddCheckboxComponent(components_box)
            break

        case 'description':
            AddDescriptionComponent(components_box, task_params)
            break

        default:
            console.log('ERROR: wrong component name')
    }
}

function GetComponentsBoxFromTask(target_task) {
    return target_task.querySelector('#components')
}

function AddCheckbox(target_task) {
    var components_box = GetComponentsBoxFromTask(target_task)

    var checkbox_list = CreateElement('section', false, ['id', 'checkbox'], false)
    var label = CreateElement('span', true, ['id', 'label'], 'Checkbox List')
    var delete_button = CreateElement('button', false, ['id', 'delete_component', 'class', 'hidden'], 'X')
    var nav_bar = CreateElement('navbar', false, ['id', 'component'], false)

    var checkbox = CreateElement('input', false, ['type', 'checkbox'], false)
    var checkbox_label = CreateElement('span', true, ['id', 'chk_label'], 'checkbox option')
    
    nav_bar.append(label)
    nav_bar.append(delete_button)

    checkbox_list.append(nav_bar)
    checkbox_list.innerHTML += '<br>'
    checkbox_list.append(checkbox)
    checkbox_list.append(checkbox_label)
    
    components_box.append(checkbox_list)
}

function AddCheckboxComponent(components_box) {
    var checkbox_list = CreateElement('section', false, ['id', 'checkbox'], false)
    var label = CreateElement('span', true, ['id', 'label'], 'Checkbox List')
    var delete_button = CreateElement('button', false, ['id', 'delete_component', 'class', 'hidden'], 'X')
    var nav_bar = CreateElement('navbar', false, ['id', 'component'], false)

    var checkbox = CreateElement('input', false, ['type', 'checkbox'], false)
    var checkbox_label = CreateElement('span', true, ['id', 'chk_label'], 'checkbox option')
    
    nav_bar.append(label)
    nav_bar.append(delete_button)

    checkbox_list.append(nav_bar)
    checkbox_list.innerHTML += '<br>'
    checkbox_list.append(checkbox)
    checkbox_list.append(checkbox_label)
    
    components_box.append(checkbox_list)
}

function AddDescription(target_task) {
    var components_box = GetComponentsBoxFromTask(target_task)

    var text = CreateElement('span', true, ['id', 'description'], "")

    components_box.append(text)
}

function AddDescriptionComponent(components_box, description) {
    var text = CreateElement('span', true, ['id', 'description'], description)

    components_box.append(text)
}

function RemoveComponent(target_task, target_component) {
    target_task.removeChild(target_component)
}