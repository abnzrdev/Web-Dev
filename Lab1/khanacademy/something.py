def eraser(s):
    first = s.find('1')
    last = s.rfind('1')
    if first == -1:
        return 0
    return s[first:last+1].count('0')

test_case = int(input())
tests = []
results = []
for i in range(test_case):
    temp = input()
    tests.append(temp)
for i in tests:
    results.append(eraser(i))
for i in results:
    print(i)


