# Envelopes(Env) Apis

- [envelopes.create](#create)
- [envelopes.excrete](#excrete)
- [envelopes.result](#result)
- [envelopes.history](#history)

## [Create]

### env/create (创建红包)

#### 类型：POST
#### 提交参数：
- 份额：lot = 5 to 20
- 金额(U币)：coin = 100,000 to 10,000,000
- 祝福语：say = 800
- 发送到：to = show | hall

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：data = { envid (红包id): xxx }

## [Excrete]

### env/excrete (拆红包)

#### 类型：POST
#### 提交参数：

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：data = {}

## [Result]

## [History]
