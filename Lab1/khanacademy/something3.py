def max_water(n, heights):
    max_water = 0
    for i in range(n):
        count = 1
        j = i - 1
        while j >= 0 and heights[j] <= heights[j+1]:
            count += 1
            j -= 1
        j = i + 1
        while j < n and heights[j] <= heights[j-1]:
            count += 1
            j += 1
        max_water = max(max_water, count)
    return max_water

n = int(input())
heights = list(map(int, input().split()))
print(max_water(n, heights))

