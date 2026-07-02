import type { TodoItem } from "@/types/todoItem";
import { v4 } from "uuid";
import { computed, ref } from "vue";

export const useTodoListHook = () => {
  const todos = ref<TodoItem[]>([]);
  const keyword = ref("");

  const selectedIds = computed(() => {
    return todos.value.filter(({ checked }) => checked).map(({ id }) => id);
  });
  const finishedIds = computed(() => {
    return todos.value.filter(({ isFinish }) => isFinish).map(({ id }) => id);
  });

  const statistic = computed(() => {
    const finishedCount = todos.value.filter(({ isFinish }) => isFinish).length;
    const unfinishedCount = todos.value.length - finishedCount;

    return { finishedCount, unfinishedCount };
  });

  const displayTodos = computed(() => {
    const result = todos.value;

    if (!keyword.value?.trim()) {
      return result;
    }

    return result.filter(({ content }) => content?.includes(keyword.value));
  });

  const handleAdd = () => {
    const newTodo: TodoItem = { id: v4(), isEditing: true };
    todos.value.unshift(newTodo);
  };

  const modifyTodos = (todoId: string, newValues: Partial<TodoItem>) => {
    return todos.value.map((item) => {
      if (todoId !== item.id) {
        return item;
      }

      return { ...item, ...newValues };
    });
  };

  const handleEdit = (todoId: string) => {
    todos.value = modifyTodos(todoId, { isEditing: true });
  };

  const handleSave = (todoId: string, content: string) => {
    todos.value = modifyTodos(todoId, { isEditing: false, content });
  };

  const handleSelectToggle = (todoId: string, checked: boolean) => {
    todos.value = modifyTodos(todoId, { checked });
  };

  const handleFinishToggole = (todoId: string, isFinish: boolean) => {
    todos.value = modifyTodos(todoId, { isFinish, isEditing: false });
  };

  const handleDelete = (targetId: string) => {
    todos.value = todos.value.filter(({ id }) => id !== targetId);
  };

  const handleBatchDelete = () => {
    todos.value = todos.value.filter(
      ({ id }) => !selectedIds.value.includes(id),
    );
  };

  const handleDeleteFinished = () => {
    todos.value = todos.value.filter(
      ({ id }) => !finishedIds.value.includes(id),
    );
  };

  const handleDeleteAll = () => {
    todos.value = [];
  };

  const handleKeywordClear = () => {
    keyword.value = "";
  };

  return {
    keyword,
    statistic,
    todos,
    displayTodos,
    selectedIds,
    finishedIds,
    handleAdd,
    handleEdit,
    handleSave,
    handleSelectToggle,
    handleDelete,
    handleBatchDelete,
    handleKeywordClear,
    handleDeleteFinished,
    handleDeleteAll,
    handleFinishToggole,
  };
};
