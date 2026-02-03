def find_min_max(m, s):
    if (s == 0 and m > 1) or (s > 9 * m):
        return "-1 -1"
    if m == 1 and s == 0:
        return "0 0"

    # Find minimum
    sum_left = s
    min_digits = []
    for i in range(m):
        for d in range(0 if i > 0 else 1, 10):
            if sum_left - d <= 9 * (m - i - 1) and sum_left - d >= 0:
                min_digits.append(str(d))
                sum_left -= d
                break
    # Find maximum
    sum_left = s
    max_digits = []
    for i in range(m):
        for d in range(9, -1, -1):
            if d <= sum_left and sum_left - d <= 9 * (m - i - 1):
                max_digits.append(str(d))
                sum_left -= d
                break
    return f"{''.join(min_digits)} {''.join(max_digits)}"

def main():
    m_s = input().split()
    m = int(m_s[0])
    s = int(m_s[1])
    print(find_min_max(m, s))

if __name__ == "__main__":
    main()