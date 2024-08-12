/**
 * 表示用于发送批量请求的 BatchRequest 对象。
 */
export default class BatchRequest {
  /**
   * 创建 BatchRequest 的实例。
   * @param {object} [config={}] - 配置对象。
   * @param {number} [config.batchSize=1] - 每个批次的大小。
   * @param {number} [config.timeout=0] - 超时时间（毫秒）。
   */
  constructor(config = {}) {
    this.controller = new AbortController()
    this.signal = this.controller.signal
    this.runningPromises = new Set()

    const defaultConfig = {
      batchSize: 3,
      timeout: 5000
    }

    this.config = { ...defaultConfig, ...config }
  }

  /**
   * 发送批量请求。
   * @param {Array} dataArray - 要发送的数据数组。
   */
  async batchSendRequests(dataArray) {
    const { batchSize, timeout } = this.config

    const batches = this.createBatches(dataArray, batchSize)
    const numBatches = batches.length
    const promises = []

    const timeoutId = setTimeout(() => {
      this.abortPromises(promises)
    }, timeout)

    try {
      let result = []
      for (let i = 0; i < numBatches; i++) {
        const batch = batches[i]
        const batchPromises = this.createBatchPromises(batch)
        const responses = await Promise.allSettled(batchPromises)
        for (const [j, response] of responses.entries()) {
          if (response.status === 'fulfilled' && response.value.features.length > 0) {
            // TODO: 获取一次结果后中断其余请求
            // const abortIndex = j + i * batchSize
            // this.abortPromises(promises, abortIndex)
            // throw new Error('请求已中断')
            result.push(response.value.features)
          }
        }
        promises.push(...batchPromises)
      }

      return result.flat()
    } catch (error) {
      throw error
    } finally {
      clearTimeout(timeoutId)
      this.abortPromises(promises)
    }
  }

  createBatchPromises(batch) {
    return batch.map((url) => this.sendServiceRequest(url, {}))
  }

  /**
   * 从给定的数据数组创建批次。
   * @param {Array} dataArray - 数据数组。
   * @param {number} batchSize - 每个批次的大小。
   * @returns {Array} - 批次数组。
   */
  createBatches(dataArray, batchSize) {
    // 实现创建批次的逻辑
    const numItems = dataArray.length
    const numBatches = Math.ceil(numItems / batchSize)
    const batches = []

    for (let i = 0; i < numBatches; i++) {
      const start = i * batchSize
      const end = start + batchSize
      const batch = dataArray.slice(start, end)
      batches.push(batch)
    }
    return batches
  }

  /**
   * 中止给定的承诺。
   * @param {Array} promises - 要中止的承诺数组。
   */
  abortPromises(promises) {
    // 实现中止承诺的逻辑
    for (let promise of promises) {
      if (this.runningPromises.has(promise)) {
        this.controller.abort()
        this.runningPromises.delete(promise)
      }
    }
  }

  async sendServiceRequest(url, options) {
    const response = await fetch(url, {
      ...options,
      signal: this.signal
    })
    return await response.json()
  }
  catch(error) {
    throw error
  }
}
