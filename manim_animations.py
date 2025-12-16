from manim import *
import random

class TaskBoardBackgroundLight(Scene):
    """Subtle animated background for light mode - orange, green, cream particles"""
    def construct(self):
        # Light mode colors
        self.camera.background_color = "#FFFEF9"  # cream-50

        # Create floating particles with orange, green, and cream colors
        particles = VGroup()
        colors = ["#FF9A56", "#66BB6A", "#FFE180"]  # orange, green, cream

        for _ in range(15):
            particle = Circle(radius=0.05, fill_opacity=0.3, stroke_width=0)
            particle.set_color(random.choice(colors))
            particle.move_to([
                random.uniform(-7, 7),
                random.uniform(-4, 4),
                0
            ])
            particles.add(particle)

        # Add subtle gradient circles
        gradient_circles = VGroup()
        for i in range(3):
            circle = Circle(radius=2 + i * 0.5, stroke_width=0)
            circle.set_fill(["#FFF9E6", "#FFF3CC"], opacity=0.1)
            circle.move_to([random.uniform(-3, 3), random.uniform(-2, 2), 0])
            gradient_circles.add(circle)

        self.add(gradient_circles, particles)

        # Animate particles floating
        animations = []
        for particle in particles:
            new_pos = [
                particle.get_center()[0] + random.uniform(-1, 1),
                particle.get_center()[1] + random.uniform(-1, 1),
                0
            ]
            animations.append(
                particle.animate.move_to(new_pos).set_opacity(random.uniform(0.2, 0.5))
            )

        # Animate gradient circles pulsing
        for circle in gradient_circles:
            animations.append(
                circle.animate.scale(1.1).set_opacity(0.15)
            )

        self.play(*animations, run_time=8, rate_func=there_and_back)


class TaskBoardBackgroundDark(Scene):
    """Subtle animated background for dark mode - darker orange, green particles"""
    def construct(self):
        # Dark mode colors
        self.camera.background_color = "#1F2937"  # gray-800

        # Create floating particles with darker, more muted colors
        particles = VGroup()
        colors = ["#FF6B35", "#4CAF50", "#FFB74D"]  # darker orange, green, amber

        for _ in range(15):
            particle = Circle(radius=0.05, fill_opacity=0.4, stroke_width=0)
            particle.set_color(random.choice(colors))
            particle.move_to([
                random.uniform(-7, 7),
                random.uniform(-4, 4),
                0
            ])
            particles.add(particle)

        # Add subtle gradient circles
        gradient_circles = VGroup()
        for i in range(3):
            circle = Circle(radius=2 + i * 0.5, stroke_width=0)
            circle.set_fill(["#374151", "#4B5563"], opacity=0.15)
            circle.move_to([random.uniform(-3, 3), random.uniform(-2, 2), 0])
            gradient_circles.add(circle)

        self.add(gradient_circles, particles)

        # Animate particles floating
        animations = []
        for particle in particles:
            new_pos = [
                particle.get_center()[0] + random.uniform(-1, 1),
                particle.get_center()[1] + random.uniform(-1, 1),
                0
            ]
            animations.append(
                particle.animate.move_to(new_pos).set_opacity(random.uniform(0.3, 0.6))
            )

        # Animate gradient circles pulsing
        for circle in gradient_circles:
            animations.append(
                circle.animate.scale(1.1).set_opacity(0.2)
            )

        self.play(*animations, run_time=8, rate_func=there_and_back)


class TaskCompletionCelebration(Scene):
    """Celebration animation when all tasks are completed"""
    def construct(self):
        self.camera.background_color = RGBA(0, 0, 0, 0)

        # Create confetti
        confetti = VGroup()
        colors = [ORANGE, GREEN, YELLOW, BLUE, RED]

        for _ in range(30):
            shape = random.choice([Square, Circle, Triangle])
            piece = shape(side_length=0.1, fill_opacity=0.8, stroke_width=0)
            piece.set_color(random.choice(colors))
            piece.move_to([
                random.uniform(-7, 7),
                4,
                0
            ])
            confetti.add(piece)

        self.add(confetti)

        # Animate confetti falling
        animations = []
        for piece in confetti:
            end_y = random.uniform(-5, -4)
            animations.append(
                AnimationGroup(
                    piece.animate.shift(DOWN * (4 + abs(end_y))),
                    Rotate(piece, angle=random.uniform(-2*PI, 2*PI)),
                    run_time=3
                )
            )

        self.play(*animations, rate_func=linear)
        self.wait(0.5)
