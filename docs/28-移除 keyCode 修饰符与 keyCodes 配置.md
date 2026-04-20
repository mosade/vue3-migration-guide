# 28. 移除 keyCode 修饰符与 keyCodes 配置

## 当前任务

移除数值型键盘事件修饰符和全局 keyCodes 配置。

## 怎么做

1. 搜索 `.13`、`.27` 这类数字 keyCode 修饰符，以及 `Vue.config.keyCodes`。
2. 把数字修饰符改成具名修饰符，比如 `.enter`、`.esc`。
3. 对没有现成修饰符的情况，改成在事件函数里判断 `event.key`。
4. 删除 `Vue.config.keyCodes` 配置。

## 改完以后确认

- 项目里不再出现数字 keyCode 修饰符和 `Vue.config.keyCodes`。
