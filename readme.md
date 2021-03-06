# Envelopes(Env) Apis

- [envelopes.create](#create)
- [envelopes.excrete](#excrete)
- [envelopes.history](#history)
- [envelopes.detail](#detail)

## [Create]

### env/create (创建红包)

#### 类型：POST
#### 提交参数：
- 份额：lot = 5 to 20
- 金额(U币)：coin = 100,000 to 10,000,000
- 祝福语：say = 800
- 发送到：to = show | hall
- 跳转：jump = '/hongbao/excrete.html?envid={{envid}}'

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：data = { envid (红包id): [int] }

## [Excrete]

### env/excrete (拆红包)

#### 类型：POST
#### 提交参数：
- 红包id：envid
- 动作action: do

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 拆包状态：type = 0: 未中, 1: 拆中, 2: 拆过
- 返回数据：data = { coin: U币 }

## [History]

### env/history (我的红包)

#### 类型：GET
#### 提交参数：
- 用户id：userid
- 类型：type = 0: 全部, 1: 我发起的, 2: 我拆过的

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：
``` javascript
data = [
    {
        envid(红包id): [int],
        data(日期): [data],
        coin(U币): [int],
        type(类型): 0: 我发起的, 1: 我参与的
    }
]
```

## [Detail]

### env/detail

#### 类型：GET
#### 提交参数：
- 红包id：envid

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：
``` javascript
data(领取信息) = [
    {
        userid(用户id): [int],
        type(类型): 0: 系统退回, 1: 被领取,
        data(日期): [data],
        coin(U币): [int]
    }
]
```


# General Apis

## [User]

### user/info

#### 类型：GET
#### 提交参数：
- 用户ID：userid

#### 返回结果：
- 错误状态：error = [boolean]
- 错误信息：msg = [string]
- 返回数据：
``` javascript
data = {
    userid: [int],
    avatar: [url],
    nick: [string]
}
```
